import Ajv from 'ajv';
import { AnyValidateFunction } from 'ajv/dist/core.js';

// import AjvErrors from 'ajv-errors';
import keywords from 'ajv-keywords';

const ajv = new Ajv({ allErrors: true, removeAdditional: 'all', useDefaults: true, allowUnionTypes: true });
keywords(ajv, 'transform');

import Logger from '../config/logger.js';
import schemas from '../schemas/init.js';

import type { NextFunction, Request, Response } from '../routes/express.js';

for (const key of Object.keys(schemas)) {
	const schema = schemas[key];

	if (!schema.request && !schema.response) {
		ajv.addSchema(schema, `request-${key}`);
		ajv.addSchema(schema, `response-${key}`);

		continue;
	}

	if (schema.request) ajv.addSchema(schema.request, `request-${key}`);
	if (schema.response) ajv.addSchema(schema.response, `response-${key}`);
}

interface Option {
	request?: boolean;
	response?: boolean;
	ignoreError?: boolean;
}
export default function (schema: string, options: Option = { request: true, response: true, ignoreError: false }) {
	let validate = null as AnyValidateFunction<unknown>;
	let filter = null as AnyValidateFunction<unknown>;

	if (options.request) validate = ajv.getSchema(`request-${schema}`);
	if (options.response) filter = ajv.getSchema(`response-${schema}`);

	if ((options.request && !validate) || (options.response && !filter)) {
		Logger.error(`schema: ${options.request && !validate ? 'request' : 'response'}: '${schema}' doesn't exist`);
		process.exit(1);
	}

	return (req: Request, res: Response, next: NextFunction) => {
		const duplicata = JSON.parse(JSON.stringify(req.body));

		const validationBody = options.request ? validate(duplicata) : true;

		let errors = [];
		if (!validationBody) {
			errors = validate.errors.map(e => {
				const path = e.instancePath ? e.instancePath.substring(1) : e;
				return `error: invalid data: '${path}' ${e.message}}`;
			});
		}

		if (errors && errors.length > 0) Logger.error(`schema: '${JSON.stringify(errors)}'`);

		if (!options.request || validationBody || options.ignoreError == true) {
			if (!options.ignoreError) req.body = duplicata;
			if (!options.response) return next();

			let defaultSend = res.send;
			let defaultJson = res.json;

			res.send = json => {
				filter(json);

				res.send = defaultSend;
				return res.send(json);
			};

			res.json = json => {
				filter(json);

				res.json = defaultJson;
				return res.json(json);
			};

			return next();
		}

		return res.status(400).send(errors);
	};
}
