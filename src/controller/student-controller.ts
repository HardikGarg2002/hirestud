import { ValidationErrors } from '../common/middleware/error-middleware.js';
import { IStudent, IStudentWithMeta } from '../common/type/student.js';
import StudentValidationSchema from '../common/validation-schema/student-validation.js';
import StudentService from '../service/student-service.js';

export default class StudentController {
	private _studentService = new StudentService();

	public getAll = async (): Promise<IStudentWithMeta> => {
		return await this._studentService.getAll();
	};
	public getById = async (id: string): Promise<IStudent> => {
		const validationResult = StudentValidationSchema.validate({ id: id }, { abortEarly: false });
		if (validationResult.error) {
			throw new ValidationErrors(validationResult.error);
		}
		return await this._studentService.getById(id);
	};
	public create = async (studentInput: IStudent): Promise<string> => {
		const validationResult = StudentValidationSchema.validate(studentInput, { abortEarly: false });

		if (validationResult.error) {
			throw new ValidationErrors(validationResult.error);
		}
		return await this._studentService.create(studentInput);
	};
}
