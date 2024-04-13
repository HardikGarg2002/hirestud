import { BusinessError } from '../common/middleware/error-middleware.js';
import { IJob } from '../common/type/job.js';
import Job from '../model/job.js';

export default class JobService {
	public async getAll(filter: any, pagination: any, sort: any): Promise<IJob[]> {
		return await Job.find(filter)
			.sort(sort)
			.skip((pagination.page - 1) * pagination.pageSize)
			.limit(pagination.pageSize);
	}

	public async getById(id: string): Promise<IJob> {
		const job = await Job.findById(id);
		if (!job) throw new BusinessError('Job not found', 'ERR_NOT_FOUND');
		return job;
	}

	public async create(jobInput: IJob): Promise<string> {
		const newJob = new Job(jobInput);
		await newJob.save();
		return newJob._id.toString(); // Assuming MongoDB ObjectId
	}

	public async update(id: string, jobInput: IJob): Promise<void> {
		await Job.findByIdAndUpdate(id, jobInput, { new: true });
	}

	public async delete(id: string): Promise<void> {
		await Job.findByIdAndDelete(id);
	}
}
