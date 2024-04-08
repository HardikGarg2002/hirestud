import { Request, Response, NextFunction } from 'express';
import { IStudent, IUser } from '../common/type/student.js';
import StudentController from '../controller/student-controller.js';

const studentController = new StudentController();

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await studentController.getAll();
		res.status(200).json(result);
	} catch (e) {
		next(e);
	}
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const studentId = req.params.id;
		const result = await studentController.getById(studentId);
		res.status(200).json(result);
	} catch (e) {
		next(e);
	}
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const loggedInUser = { name: 'hardik', _id: '1234', date: new Date() };
		// const loggedInUser: IUser = req.body.loggedInUser;
		const studentInput: IStudent = req.body;
		studentInput.created = {
			...loggedInUser,
		};
		studentInput.updated = studentInput.created;
		const resultId = await studentController.create(studentInput);
		res.status(201).json({ message: 'Student Profile created successfully', resultId });
	} catch (e) {
		next(e);
	}
};
