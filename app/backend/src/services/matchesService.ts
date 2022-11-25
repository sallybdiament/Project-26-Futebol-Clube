import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

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
