import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import IMatch from '../entities/IMatch';

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
  const created = await Matches.create({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
  return created.dataValues;
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
