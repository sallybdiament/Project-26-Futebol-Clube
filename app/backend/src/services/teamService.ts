import Teams from '../database/models/Teams';

export const findAllTeamsService = async () => Teams.findAll();

export const findTeamByIdService = async (id: number) => Teams.findByPk(id);
