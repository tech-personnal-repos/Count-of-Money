import { Router } from 'express';

import type { Request, Response } from '../../express.js';

const router = Router();

router.put('/profile', (req: Request, res: Response) => {
	const text = `Executing a profile put!`;
	res.send(text);
});
