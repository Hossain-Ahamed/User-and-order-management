import { z } from 'zod';
// FullName Zod schema
const FullNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(30, 'Length limit exceeded')
    .trim()
    .nonempty('First name is required')
    .refine(
      (value) => value === value.charAt(0).toUpperCase() + value.slice(1),
      {
        message: '{VALUE} is not in capitalize format',
      },
    ),
  lastName: z
    .string()
    .max(30, 'Length limit exceeded')
    .trim()
    .nonempty('Last name is required')
    .refine(
      (value) => value === value.charAt(0).toUpperCase() + value.slice(1),
      {
        message: ' {VALUE} is not in capitalize format',
      },
    ),
});

const AddressValidationSchema = z.object({
  street: z.string().trim().nonempty('Street is required'),
  city: z.string().trim().nonempty('City is required'),
  country: z.string().trim().nonempty('Country is required'),
});

const OrderValidationSchema = z.object({
  productName: z.string().trim().nonempty('Product name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string().trim().nonempty('Username is required'),
  password: z.string().nonempty('Password is required'),
  fullName: FullNameValidationSchema,
  age: z.number().min(0, 'Age must be a positive number'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .nonempty('Email is required'),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string().nonempty()).optional(),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema).optional(),
});

export default UserValidationSchema;
