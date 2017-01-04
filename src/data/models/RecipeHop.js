import DataType from 'sequelize';
import Model from '../sequelize';

const RecipeHop = Model.define('RecipeHops', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  recipeId: { type: DataType.INTEGER, allowNull: false },
  hopId: { type: DataType.INTEGER, allowNull: false },
  minutes: { type: DataType.INTEGER, allowNull: false },
  weight: { type: DataType.JSON, allowNull: false },
  alpha: { type: DataType.DECIMAL, allowNull: false },
  beta: { type: DataType.DECIMAL, allowNull: false },
  type: { type: DataType.STRING, allowNull: false },
  form: { type: DataType.STRING, allowNull: false }
});

export default RecipeHop;