import {z} from 'zod';

export const getConsultantSchema = z.object({
    params: z.object({
        user_id: z.string({invalid_type_error: "Id must be string"}),
    }),
});

export type getConsultantSchemaType = z.infer <typeof getConsultantSchema> ['params']

export const profileConsultantSchema = z.object({
  params: z.object({
      user_id: z.string({invalid_type_error: "Id must be string"}),
  }),
});

export type profileConsultantSchemaType = z.infer <typeof profileConsultantSchema> ['params']



export const CommentsSchema = z.object({
    params: z.object({
        id: z.string({invalid_type_error: "Comments must be string"}),
    }),
});

export type getCommentsSchemaType = z.infer <typeof CommentsSchema> ['params']

export const getSessionSchema = z.object({
    params: z.object({
        investor_id: z.string({invalid_type_error: "Id must be string"}),
    }),
});

export type getSessionSchemaType = z.infer <typeof getSessionSchema> ['params']

export const addSessionSchema = z.object({
    body: z.object({
      duration: z.string({ required_error: 'Duration is required !' }),
      price: z.string({ required_error: 'Price is required !' }),
      consultant_id: z.string({ required_error: 'consultant id is required !' }),
      investor_id: z.string({ required_error: 'investor id is required !' }),

    }),
  });

  export const deleteSessionSchema = z.object({
    params: z.object({
      id: z.string({
        required_error: 'id is required !',
        invalid_type_error: 'session id must be a string',
      }),
    }),
  });
  
  export type deleteSessionSchemaType = z.infer<typeof deleteSessionSchema>['params'];


  