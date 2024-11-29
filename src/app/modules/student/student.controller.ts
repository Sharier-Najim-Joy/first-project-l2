import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentZodValidationSchema from './student.zod.validation';
import { any } from 'joi';
// import studentValidationSchema from './student.validation';  // using joi

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // data validation using zod
    const zodParsedData = studentZodValidationSchema.parse(studentData);

    // will call service function call data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // console.log({ error }, { value });
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something Went Wrong',
    //     error: error.details,
    //   });
    // }

    // send response
    res.status(200).json({
      success: true,
      message: 'Student Create Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    // send response
    res.status(200).json({
      success: true,
      message: 'Student are Retrieve Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    // send response
    res.status(200).json({
      success: true,
      message: 'Student is Retrieve Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    // send response
    res.status(200).json({
      success: true,
      message: 'Student is Deleted Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
