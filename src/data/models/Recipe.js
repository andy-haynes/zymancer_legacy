import DataType from 'sequelize';
import Model from '../sequelize';

const Recipe = Model.define('Recipes', {
  id: { type: DataType.INTEGER, primaryKey: true },
  ownerId: { type: DataType.UUID, allowNull: false },
  isPublic: { type: DataType.BOOLEAN, defaultValue: false },
  name: { type: DataType.STRING, allowNull: false },
  ABV: { type: DataType.STRING },
  IBU: { type: DataType.STRING },
  OG: { type: DataType.STRING },
  FG: { type: DataType.STRING }
});

export default Recipe;
