import { Router } from 'express';
import smsController from "../controllers/sms.controller.js"
const smsRoutes = Router();

smsRoutes.post('/', smsController);

export default smsRoutes;

