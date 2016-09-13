import DataType from 'sequelize';
import Model from '../sequelize';

const RecipeIngredient = Model.define('RecipeIngredients', {
  id: { type: DataType.INTEGER, primaryKey: true },
  recipeId: { type: DataType.INTEGER, allowNull: false },
  ingredientId: { type: DataType.INTEGER, allowNull: false }
  // TODO: weight, quantity, and addition fields
});

export default RecipeIngredient;
