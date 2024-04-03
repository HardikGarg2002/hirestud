import { ValidationErrors } from '../common/middleware/error-middleware.js';
import { IStudent } from '../common/type/student.js';
import StudentValidationSchema from '../common/validation-schema/student-validation.js';
import StudentService from '../service/student-service.js';

export default class StudentController {
	studentService = new StudentService();

	public create = async (studentInput: IStudent): Promise<string> => {
		const validationResult = StudentValidationSchema.validate(studentInput, { abortEarly: false });
		
		if (validationResult.error) {
			throw new ValidationErrors(validationResult.error);
		}
		return await this.studentService.create(studentInput);
	};
}
