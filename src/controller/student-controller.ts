import { ValidationErrors } from '../common/middleware/error-middleware.js';
import { IStudent } from '../common/type/student.js';
import StudentService from '../service/student-service.js';

export default class StudentController {
	studentService = new StudentService();

	public create = async (studentInput: IStudent): Promise<string> => {
		
		return await this.studentService.create(studentInput);
	};
}
