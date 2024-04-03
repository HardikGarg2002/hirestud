import { BusinessError } from "../common/middleware/error-middleware.js";
import { IEdu_details, IStudent } from "../common/type/student.js";
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

	public create = async (studentInput: IStudent): Promise<string> => {
		const existingProfile = await Student.findById(studentInput._id);
		if (existingProfile) throw new BusinessError(`Student with ${studentInput._id} already exists `, 'ERR_DUPLICATE');
		studentInput.edu_details && (await this._validateEduDetails(studentInput.edu_details));

		const newStudent = await this.save(studentInput, true);
		return newStudent._id!;
	};
}
// https://youtu.be/UxirFATvWTo?si=hAcqrF3rIe76g8qu
