import { Router } from 'express';

import type { Request, Response } from '../../express.js';

const router = Router();

router.get('/:username', (req: Request, res: Response) => {
	const text = `hello world ${req.params.username}!`;
	res.send(text);
});


router.get('/auth/:provider', (req: Request, res: Response) => {
	const text = `auth using provider: ${req.params.provider}!`;
	res.send(text);
});



router.get('/auth/:provider/callback', (req: Request, res: Response) => {
	const text = `auth using provider: ${req.params.provider} callback!`;
	res.send(text);
});



router.get('/profile', (req: Request, res: Response) => {
	const text = `Executing a profile get!`;
	res.send(text);
});


export default router;
