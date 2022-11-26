import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import IMatch from '../entities/IMatch';
import { findTeamByIdService } from './teamService';

export const findAllMatchesService = async () => Matches.findAll({
  include: [
    { model: Teams, as: 'teamHome', attributes: ['teamName'] },
    { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
  ],
});

export const inProgressMatchesService = async (query: boolean) => Matches.findAll({
  where: { inProgress: query },
  include: [
    { model: Teams, as: 'teamHome', attributes: ['teamName'] },
    { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
  ],
});

export const createNewMatchService = async (newMatch: IMatch) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatch;
  if (homeTeam === awayTeam) {
    return { type: 422,
      message: {
        message: 'It is not possible to create a match with two equal teams' } };
  }
  const homeTeamExist = await findTeamByIdService(Number(homeTeam));
  const awayTeamExist = await findTeamByIdService(Number(awayTeam));
  if (!homeTeamExist || !awayTeamExist) {
    return { type: 404,
      message: {
        message: 'There is no team with such id!' } };
  }
  const created = await Matches.create({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
  return { type: 201, message: created.dataValues };
};

export const patchService = async (id: number) => {
  try {
    await Matches.update({ inProgress: false }, {
      where: { id },
    });
  } catch (error) {
    console.error();
  }
};

export const updateGoalsService = async (id:number, homeTeamGoals:number, awayTeamGoals:number) => {
  try {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
  } catch (error) {
    console.error();
  }
};
