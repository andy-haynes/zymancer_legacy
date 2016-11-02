import DataType from 'sequelize';
import Model from '../sequelize';

const Yeast = Model.define('Yeast', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataType.STRING, allowNull: false },
  code: { type: DataType.STRING, allowNull: false },
  url: { type: DataType.STRING, allowNull: false },
  description: { type: DataType.STRING(1024), allowNull: false },
  flocculation: { type: DataType.STRING, allowNull: true },
  temperatureLow: { type: DataType.INTEGER, allowNull: true },
  temperatureHigh: { type: DataType.INTEGER, allowNull: true },
  toleranceLow: { type: DataType.INTEGER, allowNull: true },
  toleranceHigh: { type: DataType.INTEGER, allowNull: true },
  attenuationLow: { type: DataType.INTEGER, allowNull: true },
  attenuationHigh: { type: DataType.INTEGER, allowNull: true },
  mfg: { type: DataType.STRING, allowNull: false },
  styles: { type: DataType.STRING(1024), allowNull: true }
});

export default Yeast;
