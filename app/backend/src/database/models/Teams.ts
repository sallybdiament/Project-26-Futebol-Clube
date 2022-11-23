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
  as: 'matches',
  foreignKey: 'home_team',
});
Teams.hasMany(Matches, {
  as: 'matches',
  foreignKey: 'away_team',
});

Matches.belongsTo(Teams, {
  as: 'teams',
  foreignKey: 'homeTeam',
});
Matches.belongsTo(Teams, {
  as: 'teams',
  foreignKey: 'awayTeam',
});

export default Teams;
