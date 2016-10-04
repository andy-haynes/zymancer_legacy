import DataType from 'sequelize';
import Model from '../sequelize';

const Hop = Model.define('Hops', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataType.STRING, allowNull: false },
  categories: { type: DataType.STRING, allowNull: true },
  url: { type: DataType.STRING, allowNull: true },
  aroma: { type: DataType.STRING, allowNull: true },
  alpha: { type: DataType.STRING, allowNull: true },
  beta: { type: DataType.STRING, allowNull: true },
  coHumulone: { type: DataType.STRING, allowNull: true },
  totalOil: { type: DataType.STRING, allowNull: true },
  myrcene: { type: DataType.STRING, allowNull: true },
  caryophyllene: { type: DataType.STRING, allowNull: true },
  farnesene: { type: DataType.STRING, allowNull: true },
  humulene: { type: DataType.STRING, allowNull: true },
  geraniol: { type: DataType.STRING, allowNull: true }
});

export default Hop;
