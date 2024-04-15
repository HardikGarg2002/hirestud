import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const getEnvironmentVariable = (key: 'ACCESS_TOKEN_SECRET' | 'REDIS_URL') => {
	const variables = process.env;

	if (!variables || !variables[key]) {
		throw new Error('Environent variable not found in env' + key);
	}

	console.log('Environment variable found:', key, variables[key]?.toString());

	return variables[key]?.toString();
};

const authorizer = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers;
		console.log('authorization headers:', authorization);
		if (!authorization) {
			return res.status(401).json({ message: 'No Header. Please login again.' });
		}

		const [_, token] = authorization.split(' ');
		if (!token) {
			return res.status(401).json({ message: 'No Token, please login' });
		}

		const payload: any = await verifyAccessToken(token);
		if (!payload) {
			return res.status(401).json({ message: 'Invalid Token, please login' });
		}
		// if token storage cache implemented using redis
		// const redisClient = await getRedisClient();
		// if (!redisClient) {
		//   return res.status(500).json({ message: "Redis client not connected. Please check configuration and restart" });
		// }
		// let userJson = await redisClient.get("user." + payload._id);
		// if (!userJson) {
		//   userJson = await redisClient.get(payload._id);
		// }

		// if (!userJson) {
		//   return res.status(401).json({ message: "No Token in cache or not matching. Please login" });
		// }

		const userJson = payload;
		const loggedInUser = JSON.parse(userJson);

		console.log('user is authorized', loggedInUser);
		if (!req.body) req.body = {};
		req.user = loggedInUser;

		const role = loggedInUser.role;

		// TODO: Add role based auth here
		// const cachedRoleString = await redisClient.get("role." + role);
		// if (!cachedRoleString) {
		//   return res.status(401).json({ message: "No Role in cache or not matching. Please login" });
		// } else {
		//   const userRole = JSON.parse(cachedRoleString);
		//   console.log("user role is", userRole);
		//   if (userRole.name !== "__SUPERUSER") {
		//     // const permission = userRole.permissions.find((p: any) => +authCode &  );
		//     // if (!permission) {
		//     //   return res.status(401).json({ message: "No Permission to access this path. Please login" });
		//     // }
		// }

		// Role based auth to be added here

		next();
	} catch (error) {
		console.log('Error in authorizer', error);
		return res.status(500).json({ message: `Error in authorizer, ${error} ` });
	}
};

export const verifyAccessToken = async (token: string) => {
	try {
		const secret = getEnvironmentVariable('ACCESS_TOKEN_SECRET') || 'secret';
		const decoded = await jwt.verify(token, secret);
		console.log('ValidToken payload:', decoded);
		return decoded;
	} catch (error) {
		console.log('Error in verifyAccessToken', error);
		return null;
	}
};

export { authorizer };
