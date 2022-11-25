import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matches from './Matches';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING(30),
  },

}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  freezeTableName: true,
  timestamps: false,
});

Teams.hasMany(Matches, {
  as: 'matcheshometeam',
  foreignKey: 'home_team',
});
Teams.hasMany(Matches, {
  as: 'matchesawayteam',
  foreignKey: 'away_team',
});

Matches.belongsTo(Teams, {
  as: 'hometeam',
  foreignKey: 'homeTeam',
});
Matches.belongsTo(Teams, {
  as: 'awayteam',
  foreignKey: 'awayTeam',
});

export default Teams;
