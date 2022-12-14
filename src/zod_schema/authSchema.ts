import {z} from 'zod';

export const registerUserSchema = z.object({
    body: z.object({
        username: z.
        string({required_error:'Username is required', invalid_type_error: 'Username must be a string'})
        .min(3,'Username must be more than 3 char').max(15, 'Username must be less than 15 char'),
        password: z
        .string({required_error:'Password is required'})
        .min(6,'Password must be more than 6 char').max(15, 'Password must be less than 15 char'),
        email: z         
        .string({required_error:'Email is required', invalid_type_error: 'Email must be a string'})
        .email('Please enter a valid email'),

        role:z.enum([ 'Investor' ,'Consultant'])
       
       
    }),
});  

export const registerConsultantSchema = z.object({
    body: z.object({
        username: z
        .string({required_error:'Username iss required', invalid_type_error: 'Username must be a string'})
        .min(3,'Username must be more than 3 char').max(15, 'Username must be less than 15 char'),
        password: z
        .string({required_error:'Password is required'})
        .min(6,'Password must be more than 6 char').max(15, 'Password must be less than 15 char'),
        email: z         
        .string({required_error:'Email is required', invalid_type_error: 'Email must be a string'})
        .email('Please enter a valid email'),
        phone: z
        .string({required_error:'Phone is required', invalid_type_error: 'Phone must be a string'})
        .min(10,'Phone must be 05XXXXXXXX').max(10, 'Phone must be 05XXXXXXXX'),
        certificate: z
        .string({required_error:'Certificate Number is required'}),

        AboutMe:z
        .string({required_error:'About You is required EX:المؤهل العلمي و سنوات الخبرة '}), 

        filed:z
        .string({required_error:'your Filed is required'}), 

        
    }),
});  


export const loginSchema = z.object({
    body: z.object({
        email: z.string({
            required_error:'email is required', invalid_type_error: 'email must be a string'
        }),
        password: z.string({
            required_error:'Password is required', invalid_type_error: 'Password must be a string'
        }),
    })
});


export const updaterConsultantSchema = z.object({
    body: z.object({
        username: z
        .string({required_error:'Name iss required', invalid_type_error: 'Username must be a string'})
        .min(3,'Username must be more than 3 char').max(15, 'Username must be less than 15 char'),
        password: z
        .string({required_error:'Password is required'})
        .min(6,'Password must be more than 6 char').max(15, 'Password must be less than 15 char'),
        phone: z
        .string({required_error:'Phone is required', invalid_type_error: 'Phone must be a string'})
        .min(10,'Phone must be 05XXXXXXXX').max(10, 'Phone must be 05XXXXXXXX'),
        certificate: z
        .string({required_error:'Certificate Number is required'}),
        AboutMe:z
        .string({required_error:'About You is required EX:المؤهل العلمي و سنوات الخبرة '}), 
        filed:z
        .string({required_error:'your Filed is required'}), 

        
    }),
});  


