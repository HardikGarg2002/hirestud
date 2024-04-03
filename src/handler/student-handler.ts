import { Request, Response, NextFunction } from 'express';
import { IStudent, IUser } from '../common/type/student.js';
import StudentController from '../controller/student-controller.js';

const studentController = new StudentController();

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
