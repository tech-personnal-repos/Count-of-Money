import { Router } from 'express';

import type { Request, Response } from '../../express.js';

const router = Router();

router.delete('/:cmid', (req: Request, res: Response) => {
	const text = `Executing a delete of item ${req.params.cmid}!`;
	res.send(text);
});



export default router;
