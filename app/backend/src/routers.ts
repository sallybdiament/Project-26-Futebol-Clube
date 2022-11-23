import { Router } from 'express';
import AuthController from './controllers/AuthController';

const routers: Router = Router();

routers.post('/login', AuthController);

export default routers;
