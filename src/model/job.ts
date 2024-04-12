import mongoose, { Schema } from 'mongoose';
import { IJob } from '../common/type/job.js';

const jobSchema = new Schema<IJob>({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	company: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	salary: {
		type: Number,
		default: null,
	},
	is_active: {
		type: Boolean,
		default: true,
	},
	remote: {
		type: Boolean,
		default: false,
	},
	requirements: {
		type: [String],
		required: true,
	},
	tags: {
		type: [String],
		default: [],
	},
	technologies: {
		type: [String],
		default: [],
	},
	employmentType: {
		type: String,
		enum: ['full-time', 'part-time', 'contract'],
		required: true,
	},
	experienceLevel: {
		type: String,
		enum: ['entry-level', 'mid-level', 'senior'],
		required: true,
	},
	job_creator: {
		by: {
			type: String,
			default: 'college',
		},
		company_id: {
			type: String,
		},
		college_id: {
			type: String,
		},
	},
	created: {
		_id: {
			type: String,
			immutable: true,
		},
		name: {
			type: String,
			immutable: true,
		},
		date: {
			type: Date,
			default: Date.now,
			immutable: true,
		},
	},
	updated: {
		_id: {
			type: String,
		},
		name: {
			type: String,
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
});

const Job = mongoose.model<IJob>('Job', jobSchema);

export default Job;
