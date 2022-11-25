import { Router } from 'express';
import login from './controllers/Auth.controller';
import validateRole from './controllers/validateToken.controller.';
import { findAllTeams, findOneTeam } from './controllers/teams.controller';
//  , Response, Request
// import AuthController from './controllers/AuthController';

const routers = Router();

// const authController = new AuthController();

// routers.post('/', (req: Request, res: Response) => authController.login(req, res));
routers.post('/login', login);
routers.get('/login/validate', validateRole);
routers.get('/teams', findAllTeams);
routers.get('/teams/:id', findOneTeam);

export default routers;
