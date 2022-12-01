// import Teams from '../database/models/Teams';

// export const findAllTeamsService = async () => Teams.findAll();

// export const findTeamByIdService = async (id: number) => Teams.findByPk(id);
import Teams from '../database/models/Teams';

export default class TeamService {
  static findAllTeams = async () => Teams.findAll();
  static findTeamById = async (id: number) => Teams.findByPk(id);
}
