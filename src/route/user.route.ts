import express from 'express';
import { getAllConsultantHandler, getConsultantHandler } from '../controller/user.controller';
import validate from '../middleware/validate';
import { getConsultantSchema } from '../zod_schema/user.schema';


const router = express.Router();



router.get('/', getAllConsultantHandler);
router.get('/consultant/:id', validate( getConsultantSchema), getConsultantHandler);

export default router;
