import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

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

export default Teams;
