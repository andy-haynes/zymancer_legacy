import DataType from 'sequelize';
import Model from '../sequelize';

const SharedRecipe = Model.define('SharedRecipes', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataType.UUID, allowNull: false },
  recipeId: { type: DataType.INTEGER, allowNull: false }
});

export default SharedRecipe;
