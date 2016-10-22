import DataType from 'sequelize';
import Model from '../sequelize';

const RecipeGrain = Model.define('RecipeGrains', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  recipeId: { type: DataType.INTEGER, allowNull: false },
  grainId: { type: DataType.INTEGER, allowNull: false },
  weight: { type: DataType.JSON, allowNull: false },
  lovibond: { type: DataType.DECIMAL, allowNull: true },
  lintner: { type: DataType.DECIMAL, allowNull: true },
  gravity: { type: DataType.DECIMAL, allowNull: true }
});

export default RecipeGrain;