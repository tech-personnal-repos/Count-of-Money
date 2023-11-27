import { Router } from 'express';

import type { Request, Response } from '../../express.js';

const router = Router();

router.get('/:cmid', (req: Request, res: Response) => {
	const text = `getting article: ${req.params.cmid}!`;
	res.send(text);
});


router.get('/:cmid/history/:period', (req: Request, res: Response) => {
	const text = `getting article: ${req.params.cmid} at period: ${req.params.period}!`;
	res.send(text);
});

export default router;
