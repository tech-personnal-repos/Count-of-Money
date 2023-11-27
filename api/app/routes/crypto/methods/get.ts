import { Router } from 'express';

import type { Request, Response } from '../../express.js';

const router = Router();

router.get('/:crypto', (req: Request, res: Response) => {
	const text = `using crypto: ${req.params.crypto}!`;
	res.send(text);
});

export default router;
