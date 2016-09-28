import DataType from 'sequelize';
import Model from '../sequelize';

const RecipeFermentation = Model.define('RecipeFermentation', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  recipeId: { type: DataType.INTEGER, allowNull: false },
  pitchRateMillionsMLP: { type: DataType.DECIMAL, allowNull: false }
});

export default RecipeFermentation;