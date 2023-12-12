import { Router } from 'express';

const router = Router();

import schemas from '../../../middleware/schemas.js';
import { wrap } from '../../../middleware/route.js';

import { rateLimiter } from '../../../middleware/bruteforce.js';

import type { Request, Response } from '../../express.js';

import { createUser } from '../../../models/database/auth/user.js';
import { User } from '../../../models/database/database.js';
import { generateUserTokens } from '../../../controllers/auth/token.js';

router.post(
	'/',
	rateLimiter,
	schemas('register'),
	wrap(async (req: Request, res: Response) => {
		const email: string = req.body.email;
		const username: string = req.body.username;
		const password: string = req.body.password;
        const newUser: User = {email: email, username: username, password: password}
        const created = await createUser(newUser);
		if (!created) {
			res.send(created);
		}
		const tokens = await generateUserTokens(newUser.email, req.body.password);
        res.send(tokens);
		// const tokens = await generateUserTokens(req.body.email, req.body.password);
		// res.send(tokens);
	})
);

export default router;
