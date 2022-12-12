"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerConsultantSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.
            string({ required_error: 'Username is required', invalid_type_error: 'Username must be a string' })
            .min(3, 'Username must be more than 3 char').max(15, 'Username must be less than 15 char'),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must be more than 6 char').max(15, 'Password must be less than 15 char'),
        email: zod_1.z
            .string({ required_error: 'Email is required', invalid_type_error: 'Email must be a string' })
            .email('Please enter a valid email'),
        role: zod_1.z.enum(['Investor', 'Consultant'])
    }),
});
exports.registerConsultantSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.
            string({ required_error: 'Username is required', invalid_type_error: 'Username must be a string' })
            .min(3, 'Username must be more than 3 char').max(15, 'Username must be less than 15 char'),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must be more than 6 char').max(15, 'Password must be less than 15 char'),
        email: zod_1.z
            .string({ required_error: 'Email is required', invalid_type_error: 'Email must be a string' })
            .email('Please enter a valid email'),
        phone: zod_1.z
            .string({ required_error: 'Phone is required', invalid_type_error: 'Phone must be a string' })
            .min(10, 'Phone must be 05XXXXXXXX').max(10, 'Phone must be 05XXXXXXXX'),
        certificate: zod_1.z
            .string({ required_error: 'Certificate Number is required' }),
        AboutMe: zod_1.z
            .string({ required_error: 'About You is required EX:المؤهل العلمي و سنوات الخبرة ' }),
        filed: zod_1.z
            .string({ required_error: 'your Filed is required' }),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required', invalid_type_error: 'email must be a string'
        }),
        password: zod_1.z.string({
            required_error: 'Password is required', invalid_type_error: 'Password must be a string'
        }),
    })
});
