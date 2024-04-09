import { IUser } from "./student.js";

export interface IJob {
    id: number; // Unique identifier for the job
    title: string; // Title of the job
    company: string; // Company offering the job
    location: string; // Location of the job
    description: string; // Description of the job
    salary?: number; // Optional salary for the job
    created:IUser;
    updated:IUser;
    is_active: boolean;
}