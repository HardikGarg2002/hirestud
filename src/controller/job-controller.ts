import { Request, Response, NextFunction } from 'express';
import { IJob } from '../common/type/job.js';
import JobService from '../service/job-service.js';
import { ValidationErrors } from '../common/middleware/error-middleware.js';
import validateJobInput from '../common/validation-schema/job-validation.js';

export default class JobController {
	private jobService = new JobService();
	public getAll = async () => {
		return await this.jobService.getAll();
	};

	public getById = async (id: string) => {
		return await this.jobService.getById(id);
	};

	public create = async (jobInput: IJob): Promise<string> => {
		// Validate job input
		const validationResult = validateJobInput(jobInput);
		if (validationResult.error) {
			throw new ValidationErrors(validationResult.error);
		}

		return await this.jobService.create(jobInput);
	};

	public update = async (jobId: string, jobInput: IJob): Promise<void> => {
		// Validate job input
		const validationResult = validateJobInput(jobInput);
		if (validationResult.error) {
			throw new ValidationErrors(validationResult.error);
		}

		await this.jobService.update(jobId, jobInput);
	};

	public delete = async (jobId: string): Promise<void> => {
		await this.jobService.delete(jobId);
	};
}
