import { Router } from 'express';
import login from './controllers/AuthController';
//  , Response, Request
// import AuthController from './controllers/AuthController';

const routers = Router();

// const authController = new AuthController();

// routers.post('/', (req: Request, res: Response) => authController.login(req, res));
routers.post('/', login);

export default routers;
