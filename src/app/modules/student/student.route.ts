import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// will call controller function
router.post('/create-student', StudentControllers.createStudent);

router.get('/allStudents', StudentControllers.getAllStudents);
router.get('/singleStudent/:studentId', StudentControllers.getSingleStudent);
router.delete('/deleteStudent/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
