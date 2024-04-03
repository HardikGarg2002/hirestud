import mongoose from 'mongoose';
import { IStudent } from '../common/type/student.js';

const student = new mongoose.Schema<IStudent>({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		auto: false,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	img_url: {
		type: String,
	},
	edu_details: {
		univ: {
			type: String,
			trim: true,
		},
		degree: {
			type: String,
			trim: true,
		},
		major: {
			type: String,
			trim: true,
		},
	},
	is_active: {
		type: Boolean,
		default: true,
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

const Student = mongoose.model('Student', student);

export default Student;
