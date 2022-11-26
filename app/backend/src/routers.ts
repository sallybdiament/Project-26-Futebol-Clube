import { Router } from 'express';
//  , Response, Request
import login from './controllers/Auth.controller';
import validateRole from './controllers/validateToken.controller.';
import { findAllTeams, findOneTeam } from './controllers/teams.controller';
import { createMatch,
  findAllMatches,
  endMatch,
  updateGoals } from './controllers/matches.controller';
// import AuthController from './controllers/AuthController';

const routers = Router();

// const authController = new AuthController();

// routers.post('/', (req: Request, res: Response) => authController.login(req, res));
routers.post('/login', login);
routers.get('/login/validate', validateRole);
routers.get('/teams', findAllTeams);
routers.get('/teams/:id', findOneTeam);
routers.get('/matches', findAllMatches);
routers.post('/matches', createMatch);
routers.patch('/matches/:id', updateGoals);
routers.patch('/matches/:id/finish', endMatch);

export default routers;
