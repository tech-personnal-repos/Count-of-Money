import { Router } from 'express';

import type { Request, Response } from '../../express.js';

const router = Router();

router.post('/register', (req: Request, res: Response) => {
	const text = `Executing a register post!`;
	res.send(text);
});


router.post('/login', (req: Request, res: Response) => {
	const text = `Executing a login post!`;
	res.send(text);
});


router.post('/logout', (req: Request, res: Response) => {
	const text = `Executing a logout post!`;
	res.send(text);
});

export default router;
