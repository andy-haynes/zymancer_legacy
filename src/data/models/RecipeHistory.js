import DataType from 'sequelize';
import Model from '../sequelize';

const RecipeHistory = Model.define('RecipeHistory', {
  id: { type: DataType.INTEGER, primaryKey: true },
  userId: { type: DataType.UUID, allowNull: false },
  recipeId: { type: DataType.INTEGER, allowNull: false }
});

export default RecipeHistory;
