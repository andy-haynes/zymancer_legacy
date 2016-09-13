import DataType from 'sequelize';
import Model from '../sequelize';

const CustomIngredient = Model.define('CustomIngredients', {
  id: { type: DataType.INTEGER, primaryKey: true },
  userId: { type: DataType.UUID, allowNull: false },
  ingredientId: { type: DataType.INTEGER, allowNull: false }
});

export default CustomIngredient;
