import DataType from 'sequelize';
import Model from '../sequelize';

const BJCPStyle = Model.define('BJCPStyles', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  categoryId: { type: DataType.INTEGER, allowNull: false },
  name: { type: DataType.TEXT, allowNull: false },
  code: { type: DataType.TEXT, allowNull: true },
  overallImpression: { type: DataType.TEXT, allowNull: true },
  aroma: { type: DataType.TEXT, allowNull: true },
  appearance: { type: DataType.TEXT, allowNull: true },
  flavor: { type: DataType.TEXT, allowNull: true },
  mouthfeel: { type: DataType.TEXT, allowNull: true },
  comments: { type: DataType.TEXT, allowNull: true },
  history: { type: DataType.TEXT, allowNull: true },
  characteristicIngredients: { type: DataType.TEXT, allowNull: true },
  styleComparison: { type: DataType.TEXT, allowNull: true },
  OG: { type: DataType.TEXT, allowNull: true },
  FG: { type: DataType.TEXT, allowNull: true },
  IBUs: { type: DataType.TEXT, allowNull: true },
  SRM: { type: DataType.TEXT, allowNull: true },
  ABV: { type: DataType.TEXT, allowNull: true },
  commercialExamples: { type: DataType.TEXT, allowNull: true },
  tags: { type: DataType.TEXT, allowNull: true }
});

export default BJCPStyle;
