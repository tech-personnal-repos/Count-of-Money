import { Router } from 'express';

import type { Request, Response } from '../../express.js';

const router = Router();

router.post('', (req: Request, res: Response) => {
	const text = `Executing a post!`;
	res.send(text);
});



export default router;
