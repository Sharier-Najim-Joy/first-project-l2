import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name is required' })
    .max(12, { message: 'First Name cannot be more than 12 characters' })
    .refine(
      (value) =>
        value.charAt(0) === value.charAt(0).toUpperCase() &&
        value.slice(1) === value.slice(1).toLowerCase(),
      {
        message: 'First Name must be in capitalize format',
      },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is required' })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must only contain alphabetic characters',
    }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's Name is required" }),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father's Occupation is required" }),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father's Contact Number is required" }),
  motherName: z.string().min(1, { message: "Mother's Name is required" }),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's Occupation is required" }),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother's Contact Number is required" }),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local Guardian Name is required' }),
  occupation: z
    .string()
    .min(1, { message: 'Local Guardian Occupation is required' }),
  contactNo: z
    .string()
    .min(1, { message: 'Local Guardian Contact Number is required' }),
  address: z.string().min(1, { message: 'Local Guardian Address is required' }),
});

const studentZodValidationSchema = z.object({
  id: z.string().min(1, { message: 'Student ID is required' }),
  password: z.string().max(20, { message: 'password ID is required' }),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'others'], {
    errorMap: () => ({ message: 'Gender must be male, female, or others' }),
  }),
  email: z.string().email({ message: 'Email must be a valid email address' }),
  dateOfBirth: z.string().min(1, { message: 'Date of Birth is required' }),
  contactNo: z.string().min(1, { message: 'Contact Number is required' }),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'Emergency Contact Number is required' }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Invalid blood group' }),
    })
    .optional(),
  presentAddress: z.string().min(1, { message: 'Present Address is required' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent Address is required' }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z
    .string()
    .url({ message: 'Profile Image must be a valid URL' })
    .optional(),
  isActive: z
    .enum(['active', 'blocked'], {
      errorMap: () => ({ message: 'Status must be active or blocked' }),
    })
    .default('active'),
  isDeleted: z.boolean(),
});

export default studentZodValidationSchema;
