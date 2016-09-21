import DataType from 'sequelize';
import Model from '../sequelize';

const RecipeYeast = Model.define('RecipeYeast', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  recipeId: { type: DataType.INTEGER, allowNull: false },
  yeastId: { type: DataType.INTEGER, allowNull: false },
  mfgDate: { type: DataType.DATE, allowNull: true },
  quantity: { type: DataType.DECIMAL, allowNull: false },
  attenuation: { type: DataType.DECIMAL, allowNull: false }
});

export default RecipeYeast;