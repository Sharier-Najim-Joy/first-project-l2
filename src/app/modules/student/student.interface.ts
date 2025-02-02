import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  password: string;
  name: UserName;
  gender: 'male' | 'female' | 'others';
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};

// for creating static custom
export interface CStudentModel extends Model<Student> {
  isUserExists(id: string): Promise<Student | null>;
}

// for creating instance custom
// export type StudentMethods = {
//   isUserExists(id: string): Promise<Student | null>;
// };

// export type CStudentModel = Model<
//   Student,
//   Record<string, never>,
//   StudentMethods
// >;
