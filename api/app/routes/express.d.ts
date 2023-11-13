import type { Query } from 'express-serve-static-core';
import type {
	Request as ExpressRequest,
	Response as ExpressResponse,
	NextFunction as NextFunctionExpress
} from 'express';
import type { User } from '../models/database/database.js';

export type Request = ExpressRequest;
export type Response = ExpressResponse;
export type NextFunction = NextFunctionExpress;

export interface RequestWithQuery<T extends Query> extends ExpressRequest {
	query: T;
}

export interface LoggedRequest extends ExpressRequest {
	token: string;
	user: {
		_id: User['_id'];
		email: User['email'];
		username: User['username'];
		roles: User['roles'];
		personalKey?: User['personalKey'];
	};
}

export type HasDatesRequest = RequestWithQuery<{ start: string; end: string }>;
export type HasDateRequest = RequestWithQuery<{ date: string }>;
export type HasYearRequest = HasDateRequest;
export type HasHotel = RequestWithQuery<{ hotel: string }>;
export type hasThreeYearsAndMonthRequest = RequestWithQuery<{
	hotel: string;
	yearl0: string;
	yearl1: string;
	yearl2: string;
	month: string;
}>;
// export type HasTag = RequestWithQuery<{ tag: string }>;
export type HasRangeRequest = RequestWithQuery<{ start: string; length: string }>;

export interface UserFromWebapp extends Omit<User, 'hotelsAccess'> {
	hotelsAccess: string[];
}
