import express from 'express';
import { RegisterHandler, LoginHandler, ProfileHandler, deleteHandler  } from '../controller/auth.controller';
import { deleteSessionHandler, getAllConsultantHandler, getConsultantHandler, getConsultantProfileHandler, getSessionHandler } from '../controller/user.controller';
import { protect } from '../middleware/auth';
import validate from '../middleware/validate';
import { loginSchema, registerConsultantSchema, registerUserSchema } from '../zod_schema/authSchema';
import { deleteSessionSchema, getConsultantSchema, getSessionSchema, profileConsultantSchema } from '../zod_schema/user.schema';

const router = express.Router();

router.post('/register', validate(registerConsultantSchema), RegisterHandler);
router.post('/Userregister', validate(registerUserSchema), RegisterHandler);
router.post('/login', validate(loginSchema), LoginHandler);

router.get('/consultant', getAllConsultantHandler);
router.get('/con/:user_id', validate( getConsultantSchema), getConsultantHandler);
router.get('/:consultant_id', validate( getSessionSchema), getSessionHandler);
router.get('/consultantProfile/:user_id', getConsultantProfileHandler);

router.delete('/:id',protect,validate(deleteSessionSchema),deleteSessionHandler);
router.delete('/:id',deleteHandler);

export default router;