import express from 'express';
import { ConsultantLoginHandler, ConsultantRegisterHandler, UserLoginHandler, userRegisterHandler } from '../controller/auth.controller';
import validate from '../middleware/validate';
import { loginSchema, registerConsultantSchema, registerUserSchema } from '../zod_schema/authSchema';

const router = express.Router();

router.post('/register', validate(registerConsultantSchema), ConsultantRegisterHandler);
router.post('/login', validate(loginSchema), ConsultantLoginHandler);

router.post('/userlogin', validate(loginSchema), UserLoginHandler);
router.post('/userregister', validate(registerUserSchema), userRegisterHandler);

export default router;