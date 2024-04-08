import { BusinessError } from '../common/middleware/error-middleware.js';
import { IEdu_details, IStudent, IStudentWithMeta } from '../common/type/student.js';
import Student from '../model/student.js';

export default class StudentService {
	private async _validateEduDetails(eduDetails: IEdu_details) {
		if (!eduDetails || !eduDetails.univ || !eduDetails.degree || !eduDetails.major) {
			throw new BusinessError('Missing edu details', 'ERR_MISSING_EDU_DETAILS');
		}
	}
	public async save(studentInput: IStudent, isNew: boolean = false): Promise<IStudent> {
		const student = new Student(studentInput);
		student.isNew = isNew;
		return (await student.save()).toObject();
	}

	public getAll = async (): Promise<IStudentWithMeta> => {
		const students = await Student.find();
		return {
			data: students,
			meta: {
				total: students.length,
			},
		};
	};

	public getById = async (id: string): Promise<IStudent> => {
		const student = await Student.findById(id);
		if (!student) throw new BusinessError(`Student with ${id} not found`, 'ERR_NOT_FOUND');
		return student;
	};

	public create = async (studentInput: IStudent): Promise<string> => {
		const existingProfile = await Student.findOne({ id: studentInput.id });
		if (existingProfile) throw new BusinessError(`Student with ${studentInput.id} already exists `, 'ERR_DUPLICATE');
		studentInput.edu_details && (await this._validateEduDetails(studentInput.edu_details));

		const newStudent = await this.save(studentInput, true);
		return newStudent.id!;
	};
}
// https://youtu.be/UxirFATvWTo?si=hAcqrF3rIe76g8qu
