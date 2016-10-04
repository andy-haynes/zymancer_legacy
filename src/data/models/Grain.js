import DataType from 'sequelize';
import Model from '../sequelize';

const Grain = Model.define('Grains', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataType.STRING, allowNull: false },
  category: { type: DataType.STRING, allowNull: true },
  lovibond: { type: DataType.STRING, allowNull: true },
  flavor: { type: DataType.STRING, allowNull: true },
  characteristics: { type: DataType.STRING(512), allowNull: true },
  gravity: { type: DataType.DECIMAL, allowNull: true },
  DBFG: { type: DataType.DECIMAL, allowNull: true },
  DBCG: { type: DataType.DECIMAL, allowNull: true },
  description: { type: DataType.STRING(512), allowNull: true },
  mfg: { type: DataType.STRING, allowNull: false },
  isExtract: { type: DataType.BOOLEAN, allowNull: false, defaultValue: false },
  url: { type: DataType.STRING, allowNull: true }
});

export default Grain;
