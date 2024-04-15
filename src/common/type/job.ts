import { IUser } from './student.js';

const job_creator_by = ['company', 'college'];

export interface IJob {
	id: string; // Unique identifier for the job
	title: string; // Title of the job
	company: string; // Company offering the job
	location: string; // Location of the job
	description: string; // Description of the job
	salary?: number; // Optional salary for the job
	is_active: boolean;
	remote?: boolean;
	requirements: string[];
	tags: string[];
	technologies: string[];
	employmentType: 'full-time' | 'part-time' | 'contract'; // Type of employment
	experienceLevel: 'entry-level' | 'mid-level' | 'senior'; // Experience level required
	job_creator: {
		by: 'company' | 'college';
		company_id?: string;
		college_id?: string;
	};
	created: IUser;
	updated: IUser;
}

export interface IJobWithMeta {
	meta: {
		page: number;
		pageSize: number;
		total: number;
	};
	data: IJob[];
}
