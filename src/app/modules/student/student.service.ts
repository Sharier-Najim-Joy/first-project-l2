import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: Student) => {
  if (await StudentModel.isUserExists(studentData.id)) {
    throw new Error('User Already Exists 2');
  }

  const result = await StudentModel.create(studentData); // built in static method

  // const student = new StudentModel(studentData); // create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User Already Exists');
  // }
  // const result = await student.save(); // built in instance method

  return result;
};

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
