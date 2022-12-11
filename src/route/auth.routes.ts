import express from 'express';
import { RegisterHandler, LoginHandler  } from '../controller/auth.controller';
import validate from '../middleware/validate';
import { loginSchema, registerConsultantSchema, registerUserSchema } from '../zod_schema/authSchema';

const router = express.Router();

router.post('/register', validate(registerConsultantSchema), RegisterHandler);
router.post('/Userregister', validate(registerUserSchema), RegisterHandler);
router.post('/login', validate(loginSchema), LoginHandler);



export default router;