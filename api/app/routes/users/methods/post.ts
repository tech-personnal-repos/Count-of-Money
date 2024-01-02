import { Router } from "express";
import { rateLimiter } from "../../../middleware/bruteforce.js";
import { wrap } from "../../../middleware/route.js";
import { LoggedRequest, Request, Response } from "../../express.js";
import schemas from "../../../middleware/schemas.js";
import { User } from "../../../models/database/database.js";
import { createUser } from "../../../models/database/auth/user.js";
import { generateUserTokens, refreshUserTokens } from "../../../controllers/auth/token.js";
import { isLoggedWithRefresh } from "../../../middleware/authentication.js";

const router = Router();

router.post(
    '/register',
    rateLimiter,
    schemas("register"),
    wrap(async (req: Request, res: Response) => {
        const email: string = req.body.email;
		const username: string = req.body.username;
		const password: string = req.body.password;
        const newUser: User = {email: email, username: username, password: password}
        const created = await createUser(newUser);
		if (!created) {
			res.send(created);
		}
		const tokens = await generateUserTokens(newUser.username, req.body.password);
        res.send(tokens);
    }
));

router.post(
	'/login',
	rateLimiter,
	schemas('login'),
	wrap(async (req: Request, res: Response) => {
		const tokens = await generateUserTokens(req.body.username, req.body.password);
		res.send(tokens);
	})
);


router.post(
	'/refresh',
	isLoggedWithRefresh,
	schemas('login', { response: true }),
	wrap(async (req: LoggedRequest, res: Response) => {
		const token = await refreshUserTokens(req.user);
		res.send(token);
	})
);


export default router;