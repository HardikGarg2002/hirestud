import Joi from 'joi';
import { IJob } from '../type/job.js';

// Define Joi schema for job input validation
const validateJobInput = (job: IJob): Joi.ValidationResult => {
	const schema = Joi.object<IJob>({
		id: Joi.string().required(),
		title: Joi.string().required(),
		company: Joi.string().required(),
		location: Joi.string().required(),
		description: Joi.string().required(),
		salary: Joi.number().allow(null).optional(),
		is_active: Joi.boolean().optional(),
		remote: Joi.boolean().optional(),
		requirements: Joi.array().items(Joi.string()).required(),
		tags: Joi.array().items(Joi.string()).optional(),
		technologies: Joi.array().items(Joi.string()).optional(),
		employmentType: Joi.string().valid('full-time', 'part-time', 'contract').required(),
		experienceLevel: Joi.string().valid('entry-level', 'mid-level', 'senior').required(),
	});

	return schema.validate(job, { abortEarly: false });
};
export default validateJobInput;
