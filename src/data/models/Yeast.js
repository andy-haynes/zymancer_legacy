import DataType from 'sequelize';
import Model from '../sequelize';

const Yeast = Model.define('Yeast', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataType.STRING, allowNull: false },
  code: { type: DataType.STRING, allowNull: true },
  url: { type: DataType.STRING, allowNull: false },
  description: { type: DataType.STRING(1024), allowNull: false },
  flocculation: { type: DataType.STRING, allowNull: true },
  rangeF: { type: DataType.STRING, allowNull: true },
  rangeC: { type: DataType.STRING, allowNull: true },
  tolerance: { type: DataType.STRING, allowNull: true },
  attenuationRange: { type: DataType.STRING, allowNull: true },
  mfg: { type: DataType.STRING, allowNull: true },
  styles: { type: DataType.STRING(1024), allowNull: true }
});

export default Yeast;
