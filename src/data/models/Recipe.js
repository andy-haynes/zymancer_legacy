import DataType from 'sequelize';
import Model from '../sequelize';

const Recipe = Model.define('Recipes', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  ownerId: { type: DataType.UUID, allowNull: false },
  isPublic: { type: DataType.BOOLEAN, defaultValue: false },
  name: { type: DataType.STRING, allowNull: false },
  ABV: { type: DataType.DECIMAL },
  IBU: { type: DataType.DECIMAL },
  OG: { type: DataType.DECIMAL },
  FG: { type: DataType.DECIMAL }
});

export default Recipe;
