import mongoose from 'mongoose';


export interface IStudent {
	_id?: string;
	name: string;
	img_url: string;
	edu_details?: IEdu_details;
	is_active?: boolean;
	created?: IUser;
	updated?: IUser;
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
