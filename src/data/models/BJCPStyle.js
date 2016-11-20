import DataType from 'sequelize';
import Model from '../sequelize';

const BJCPStyle = Model.define('BJCPStyles', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  categoryId: { type: DataType.INTEGER, allowNull: true },
  name: { type: DataType.TEXT, allowNull: false },
  code: { type: DataType.TEXT, allowNull: true },
  description: { type: DataType.TEXT, allowNull: true },
  overall_impression: { type: DataType.TEXT, allowNull: true },
  aroma: { type: DataType.TEXT, allowNull: true },
  appearance: { type: DataType.TEXT, allowNull: true },
  flavor: { type: DataType.TEXT, allowNull: true },
  mouthfeel: { type: DataType.TEXT, allowNull: true },
  comments: { type: DataType.TEXT, allowNull: true },
  history: { type: DataType.TEXT, allowNull: true },
  characteristic_ingredients: { type: DataType.TEXT, allowNull: true },
  style_comparison: { type: DataType.TEXT, allowNull: true },
  og_low: { type: DataType.FLOAT, allowNull: true },
  og_high: { type: DataType.FLOAT, allowNull: true },
  fg_low: { type: DataType.FLOAT, allowNull: true },
  fg_high: { type: DataType.FLOAT, allowNull: true },
  ibu_low: { type: DataType.FLOAT, allowNull: true },
  ibu_high: { type: DataType.FLOAT, allowNull: true },
  srm_low: { type: DataType.FLOAT, allowNull: true },
  srm_high: { type: DataType.FLOAT, allowNull: true },
  abv_low: { type: DataType.FLOAT, allowNull: true },
  abv_high: { type: DataType.FLOAT, allowNull: true },
  commercial_examples: { type: DataType.TEXT, allowNull: true },
  tags: { type: DataType.TEXT, allowNull: true }
});

export default BJCPStyle;
