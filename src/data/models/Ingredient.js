import DataType from 'sequelize';
import Model from '../sequelize';

const Ingredient = Model.define('Ingredients', {
  id: { type: DataType.INTEGER, primaryKey: true },
  ingredientType: { type: DataType.INTEGER, allowNull: false }
});

export default Ingredient;
