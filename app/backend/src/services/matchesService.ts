import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

const findAllMatchesService = async () => Matches.findAll({
  include: [
    { model: Teams, as: 'teamHome', attributes: ['teamName'] },
    { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
  ],
});

export default findAllMatchesService;
