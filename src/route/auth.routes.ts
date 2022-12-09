import express from 'express';
import { ConsultantLoginHandler, ConsultantRegisterHandler } from '../controller/auth.controller';
import validate from '../middleware/validate';
import { loginSchema, registerConsultantSchema } from '../zod_schema/authSchema';

const router = express.Router();

router.post('/register', validate(registerConsultantSchema), ConsultantRegisterHandler);
router.post('/login', validate(loginSchema), ConsultantLoginHandler);

export default router;