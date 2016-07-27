import DataType from 'sequelize';
import Model from '../sequelize';

const Recipe = Model.define('Recipe', {
  id: { type: DataType.INTEGER, primaryKey: true },
  userId: { type: DataType.INTEGER },
  name: { type: DataType.STRING },
  style: { type: DataType.STRING }
});

export default Recipe;
