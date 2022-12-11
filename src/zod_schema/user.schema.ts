import {z} from 'zod';

export const getConsultantSchema = z.object({
    params: z.object({
        user_id: z.string({invalid_type_error: "Id must be string"}),
    }),
});

export type getConsultantSchemaType = z.infer <typeof getConsultantSchema> ['params']


export const getSessionSchema = z.object({
    params: z.object({
        investor_id: z.string({invalid_type_error: "Id must be string"}),
    }),
});

export type getSessionSchemaType = z.infer <typeof getSessionSchema> ['params']