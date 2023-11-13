import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

import schemas from '../schemas/init.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Parameter {
    name: string;
    in: string;
    required: boolean;
    schema: { type: string; example?: string };
}

interface Security {
    [key: string]: any[];
}

interface Schema {
    request: boolean;
    response: boolean;
    name: string;
}

interface MappedEndpoints {
    [method: string]: {
        tags: string[];
        parameters: Parameter[];
        security: Security;
        requestBody?: {
            required: true;
            content: { 'application/json': { schema: any } };
        };
        responses: {
            200: {
                description: 'OK';
                content: { 'application/json': { schema: any } };
            };
            400: { description: 'error'; content: {} };
        };
    };
}

const MIDDLEWARE = {
    isLogged: {
        detect: (endpoint: string) => endpoint.match(/isLogged/),
        security: { Bearer: [] }
    }
};

function parseEndpointSchemas(endpoint: string) {
    const rSchema = /schemas\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/;

    const [raw] = endpoint.match(rSchema) || [];
    if (!raw) return undefined;

    const schema = { request: true, response: true };

    if (raw.includes('response:true') && !raw.includes('request:true'))
        schema.request = false;
    if (raw.includes('request:true') && !raw.includes('response:true'))
        schema.response = false;

    const [, , name] = raw.match(/^schemas\(('|")(\w+)/);

    return { name, ...schema };
}

function getNextEndpoint(file: string, start: number) {
    let parenthesis = null;
    let endpoint = '';

    for (const character of file.slice(start)) {
        endpoint += character;

        if (character === '(')
            parenthesis = parenthesis === null ? 1 : parenthesis + 1;
        if (character === ')')
            parenthesis = parenthesis === null ? 0 : parenthesis - 1;

        if (parenthesis === 0) return endpoint;
    }

    return endpoint;
}

function parseMethodFile(filename: string, tag: string) {
    const file = fs.readFileSync(filename, 'utf-8').replace(/\/\/.+\n/g, '');

    let start = 0;
    const methods = [] as string[];
    while (start < file.length) {
        start = file.indexOf('router.', start);
        if (start === -1) break;

        methods.push(getNextEndpoint(file, start));
        start += 1;
    }

    const endpoints = methods.map(raw => {
        const endpoint = raw.replace(/(\n|\t| )/g, '');

        let [, method, path] = endpoint.match(/^router\.(\w+?)\((.+?)(,|\))/);
        let parameters = null as string[];

        path = path
            .split('/')
            .map(e => {
                if (e.startsWith(':')) {
                    const param: string = e
                        .substring(1)
                        .replace(/^('|")/, '')
                        .replace(/('|")$/, '');

                    if (!parameters) parameters = [param];
                    else parameters.push(param);

                    return `{${param}}`;
                }

                return e;
            })
            .join('/')
            .replace(/^('|")/, '')
            .replace(/('|")$/, '');

        const middleware = Object.entries(MIDDLEWARE).reduce<string[]>(
            (acc, [key, { detect }]) => {
                if (detect(endpoint)) acc.push(key);
                return acc;
            },
            []
        );

        const schemas = parseEndpointSchemas(endpoint);

        return {
            tag: `${tag === 'root' ? '/' : tag}`,
            method,
            path: `${tag === 'root' ? '' : '/' + tag}${path}`,
            parameters,
            middleware,
            schemas
        };
    });

    return endpoints;
}

const PATHS = {} as MappedEndpoints;
const ROOT = `${__dirname}/../../app/routes`;

function removeSchemasMultipleTypes(schema: any, removeDefault = false) {
    if (!schema) return undefined;

    let stringified = JSON.stringify(schema);

    stringified = stringified
        .replace(/"type":\[("\w+").+?\]/g, '"type": $1')
        .replace(/patternProperties/g, 'properties')
        .replace(/pattern/g, 'format');

    if (removeDefault)
        stringified = stringified.replace(/,?"default":(\w+|"\w+")/g, '');

    return JSON.parse(stringified);
}

if (process.env.NODE_ENV !== 'production') {
    const folders = fs
        .readdirSync(ROOT)
        .sort((a, b) => (a === 'root' ? -1 : 1));

    for (const path of folders) {
        if (!fs.lstatSync(`${ROOT}/${path}`).isDirectory()) continue;
        for (const file of fs.readdirSync(`${ROOT}/${path}/methods`)) {
            const endpoints = parseMethodFile(
                `${ROOT}/${path}/methods/${file}`,
                path
            );

            for (const endpoint of endpoints) {
                const pathParams: Parameter[] =
                    endpoint?.parameters?.map((name: string) => ({
                        name,
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    })) || [];

                const queryParam: Parameter[] =
                    endpoint?.middleware?.reduce((acc, cur) => {
                        const middleware = MIDDLEWARE[cur];

                        return [...acc, ...(middleware.parameters || [])];
                    }, []) || [];

                const security: Security[] =
                    endpoint?.middleware?.reduce((acc, cur) => {
                        const middleware = MIDDLEWARE[cur];

                        if (middleware.security) acc.push(middleware.security);
                        return acc;
                    }, []) || [];

                const { request, response } = endpoint.schemas
                    ? schemas[endpoint.schemas.name]
                    : ({} as Schema);

                const requestBody = {
                    required: true,
                    content: {
                        'application/json': {
                            schema: removeSchemasMultipleTypes(request)
                        }
                    }
                };

                const responseBody = {
                    'application/json': {
                        schema: removeSchemasMultipleTypes(response, true)
                    }
                };

                PATHS[endpoint.path] = {
                    ...PATHS[endpoint.path],

                    [endpoint.method]: {
                        tags: [endpoint.tag],
                        parameters: [...pathParams, ...queryParam],
                        security,
                        requestBody:
                            endpoint.schemas && endpoint.schemas.request
                                ? requestBody
                                : undefined,

                        responses: {
                            200: {
                                description: 'OK',
                                content:
                                    endpoint.schemas &&
                                    endpoint.schemas.response
                                        ? responseBody
                                        : {}
                            },
                            400: {
                                description: 'error',
                                content: {}
                            }
                        }
                    }
                };
            }
        }
    }
}

export const template = JSON.parse(
    fs.readFileSync('documentation/template.json', 'utf-8')
);
template.paths = { ...template.paths, ...PATHS } as MappedEndpoints;

export const css = fs.readFileSync('documentation/swagger.css', 'utf-8');
