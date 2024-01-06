import { LoggedRequest, NextFunction, Response } from '../routes/express.js';

export function hasRole(role: string) {
	return async (req: LoggedRequest, res: Response, next: NextFunction) => {
		if (!req?.user?.roles || !req.user.roles.includes(role)) return res.status(401).send('you are not allowed');

		next();
	};
}

export function hasOneOfRoles(acceptedRoles: string[]) {
	return async (req: LoggedRequest, res: Response, next: NextFunction) => {
		if (!req?.user?.roles || !req.user.roles.some((role) => acceptedRoles.includes(role)))
			return res.status(401).send('you are not allowed');

		next();
	};
}