import express from 'express';
import { RegisterHandler, LoginHandler  } from '../controller/auth.controller';
import { getAllConsultantHandler, getConsultantHandler } from '../controller/user.controller';
import validate from '../middleware/validate';
import { loginSchema, registerConsultantSchema, registerUserSchema } from '../zod_schema/authSchema';
import { getConsultantSchema } from '../zod_schema/user.schema';

const router = express.Router();

router.post('/register', validate(registerConsultantSchema), RegisterHandler);
router.post('/Userregister', validate(registerUserSchema), RegisterHandler);
router.post('/login', validate(loginSchema), LoginHandler);

router.get('/consultant', getAllConsultantHandler);
router.get('/:user_id', validate( getConsultantSchema), getConsultantHandler);




export default router;