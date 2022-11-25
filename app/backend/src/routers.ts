import { Router } from 'express';
import login from './controllers/Auth.controller';
import validateRole from './controllers/validateToken.controller.';
//  , Response, Request
// import AuthController from './controllers/AuthController';

const routers = Router();

// const authController = new AuthController();

// routers.post('/', (req: Request, res: Response) => authController.login(req, res));
routers.post('/', login);
routers.get('/validate', validateRole);

export default routers;
