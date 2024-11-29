import Joi from 'joi';

// creating a schema validation using joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(12)
    .regex(/^[A-Z][a-z]*$/, 'capitalize format') // Ensures the first letter is uppercase and the rest are lowercase
    .required()
    .messages({
      'string.empty': 'First Name is required',
      'string.max': 'First Name cannot be more than 12 characters',
      'string.pattern.name':
        'First Name must start with an uppercase letter and be properly capitalized',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/, 'letters only')
    .required()
    .messages({
      'string.empty': 'Last Name is required',
      'string.pattern.name':
        'Last Name must contain only alphabetic characters',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': "Father's Name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': "Father's Occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': "Father's Contact Number is required",
  }),
  motherName: Joi.string().required().messages({
    'string.empty': "Mother's Name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': "Mother's Occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': "Mother's Contact Number is required",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Local Guardian Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Local Guardian Contact Number is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Local Guardian Address is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'others').required().messages({
    'string.empty': 'Gender is required',
    'any.only': '{#value} is not a valid gender',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': '{#value} is not a valid email address',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.empty': 'Date of Birth is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact Number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency Contact Number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present Address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian information is required',
  }),
  profileImg: Joi.string()
    .uri()
    .default('https://example.com/default-profile.png'),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#value} is not a valid status',
  }),
});

export default studentValidationSchema;
