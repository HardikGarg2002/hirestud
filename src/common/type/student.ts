import mongoose from 'mongoose';

export interface IStudent {
	id?: string;
	name: string;
	img_url: string;
	edu_details?: IEdu_details;
	kagaaz?: IKagaaz[];
	is_active?: boolean;
	created?: IUser;
	updated?: IUser;
}

export interface IKagaaz {
	_type: string;
	img_url: string;
}

export interface IStudentWithMeta {
	data: IStudent[];
	meta: { total: number };
}

export interface IEdu_details {
	univ: string;
	degree: string;
	major: string;
}

export interface IUser {
	_id: string;
	name: string;
	date?: Date;
}
