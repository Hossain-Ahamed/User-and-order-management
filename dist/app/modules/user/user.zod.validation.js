"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// FullName Zod schema
const FullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .max(30, 'Length limit exceeded')
        .trim()
        .nonempty('First name is required')
        .refine((value) => value === value.charAt(0).toUpperCase() + value.slice(1), {
        message: '{VALUE} is not in capitalize format',
    }),
    lastName: zod_1.z
        .string()
        .max(30, 'Length limit exceeded')
        .trim()
        .nonempty('Last name is required')
        .refine((value) => value === value.charAt(0).toUpperCase() + value.slice(1), {
        message: ' {VALUE} is not in capitalize format',
    }),
});
const AddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string().trim().nonempty('Street is required'),
    city: zod_1.z.string().trim().nonempty('City is required'),
    country: zod_1.z.string().trim().nonempty('Country is required'),
});
const OrderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().trim().nonempty('Product name is required'),
    price: zod_1.z.number().min(0, 'Price must be a positive number'),
    quantity: zod_1.z.number().min(1, 'Quantity must be at least 1'),
});
const UserValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().trim().nonempty('Username is required'),
    password: zod_1.z.string().nonempty('Password is required'),
    fullName: FullNameValidationSchema,
    age: zod_1.z.number().min(0, 'Age must be a positive number'),
    email: zod_1.z
        .string()
        .email('Please enter a valid email address')
        .nonempty('Email is required'),
    isActive: zod_1.z.boolean().default(true),
    hobbies: zod_1.z.array(zod_1.z.string().nonempty()).optional(),
    address: AddressValidationSchema,
    orders: zod_1.z.array(OrderValidationSchema).optional(),
});
exports.default = UserValidationSchema;
