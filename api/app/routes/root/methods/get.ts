import { Router } from 'express';

import type { NextFunction, Request, Response } from '../../express.js';

const router = Router();

/* c8 ignore start */
if (process.env.SERVERLESS === 'false')  {
	const swaggerUi = await import('swagger-ui-express');
	const { template, css } = await import('../../../doc/generate.js');
	router.use('/', swaggerUi.serve);
	router.get(
		'/',
		(req: Request & { swaggerDoc: any }, res: Response, next: NextFunction) => {
			template.info.version = process.env.npm_package_version;
			req.swaggerDoc = template;
			next();
		},
		swaggerUi.setup(template, { customCss: css, customSiteTitle: 'Documentation' })
	);
} else {
	router.get('/', (req: Request, res: Response) => {
		const text = `API version: ${process.env.npm_package_version}`;
		res.send(text);
	});
}
/* c8 ignore stop */

router.get('/wip', (req: Request, res: Response) => {
	res.send(['dev', 'stage'].includes(process.env.DB_NAME));
});

export default router;
