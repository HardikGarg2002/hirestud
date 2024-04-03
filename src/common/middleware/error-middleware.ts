// import { APIError, SystemError } from '/common-errors-ts';
import { NextFunction, Request, Response } from 'express';
import { AxiosError } from 'axios';
// import { ValidationError } from 'joi';

export interface JoiValidationError extends Error {
	message: string;
	details: ValidationErrorItem[];
}
interface Context {
	[key: string]: any;
	key?: string;
	label?: string;
	value?: any;
}
interface ValidationError extends Error {
	name: 'ValidationError';
	isJoi: boolean;
	details: ValidationErrorItem[];
	annotate(stripColors?: boolean): string;
	_original: any;
}

interface ValidationErrorItem {
	message: string;
	path: Array<string | number>;
	type: string;
	context?: Context;
}

export class ValidationErrors extends Error {
	private errors: JoiValidationError['details'];
	constructor(err: JoiValidationError) {
		super(err.message);
		this.errors = err.details;
	}
}
export class BusinessError extends Error {
	errorCode: string;

	constructor(message: string, errorCode: string) {
		super(message);
		this.errorCode = errorCode;
	}
}
export class APIError extends Error {
	errorCode: string;
	status: number;
	constructor(status: number, message: string, errorCode: string) {
		super(message);
		this.errorCode = errorCode;
		this.status = status;
	}
}
export class SystemError extends Error {
	error: Error;
	constructor(message: string, error: Error) {
		super(message);
		this.error = error;
	}
}
export class ConfigurationError extends Error {
	constructor(message: string) {
		super(message);
	}
}
export const ErrorHandlerMiddleware = (error: Error, req: Request, res: Response, _next: NextFunction) => {
	// TODO: Log the error using the common handler
    console.log('default error handler called')
	if (error instanceof APIError) {
		res.status(error.status).json({ message: error.message });
		return;
	} else if (error instanceof ValidationErrors) {
		res.status(400).json(error);
		return;
	} else if (error instanceof BusinessError) {
		res.status(400).json({ message: error.message, errorCode: error.errorCode });
		return;
	} else if (error instanceof ConfigurationError) {
		res.status(501).json({ message: error.message });
	} else if (error instanceof SystemError) {
		res.status(500).json({
			message: error.message,
			error: error.error.message,
			stack: error.error.stack,
		});
		return;
	} else if (error instanceof SyntaxError) {
		res.status(400).json({ message: `Invalid JSON. ${error.message}` });
		return;
	} else if (error instanceof AxiosError) {
		res.status(error.status || 400).json({ message: error.message });
		return;
	}

	// next(error);
	res.status(500).json({ message: 'defaultErrorHandler : Something went wrong' + error.message });
};
