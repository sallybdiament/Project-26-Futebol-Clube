import { Router, Response, Request } from 'express';
import login from './controllers/Auth.controller';
import validateRole from './controllers/validateToken.controller.';
// import { findAllTeams, findOneTeam } from './controllers/TeamsController';
import TeamController from './controllers/TeamsController';
import { createMatch,
  findAllMatches,
  endMatch,
  updateGoals } from './controllers/matches.controller';
import { getLeaderboard,
  getLeaderboardAway,
  getLeaderboardHome } from './controllers/leaderboard.controller';

const routers = Router();

routers.post('/login', login);
routers.get('/login/validate', validateRole);
// routers.get('/teams', findAllTeams);
// routers.get('/teams/:id', findOneTeam);
routers.get('/teams', (req: Request, res: Response) => TeamController.findAllTeams(req, res));
routers.get('/teams/:id', (req: Request, res: Response) => TeamController.findOneTeam(req, res));
routers.get('/matches', findAllMatches);
routers.post('/matches', createMatch);
routers.patch('/matches/:id', updateGoals);
routers.patch('/matches/:id/finish', endMatch);
routers.get('/leaderboard', getLeaderboard);
routers.get('/leaderboard/home', getLeaderboardHome);
routers.get('/leaderboard/away', getLeaderboardAway);

export default routers;
