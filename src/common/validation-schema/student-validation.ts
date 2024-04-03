import Joi from 'joi';
import { IStudent } from '../type/student.js';

const StudentValidationSchema = Joi.object<IStudent>({
	name: Joi.string().alphanum().min(3).max(25).trim(true).required(),
	img_url: Joi.string().uri().required(),
	edu_details: Joi.object({
		univ: Joi.string().required(),
		degree: Joi.string().required(),
		major: Joi.string().required(),
	}),
	is_active: Joi.boolean(),
	created: Joi.object({
		_id: Joi.string().required(),
		name: Joi.string().required(),
		date: Joi.date(),
	}),
	updated: Joi.object({
		_id: Joi.string().required(),
		name: Joi.string().required(),
		date: Joi.date(),
	}),
});

export default StudentValidationSchema;
