import DataType from 'sequelize';
import Model from '../sequelize';

const Yeast = Model.define('Yeast', {
  id: { type: DataType.INTEGER, primaryKey: true },
  ingredientId: { type: DataType.INTEGER, allowNull: false },
  name: { type: DataType.STRING, allowNull: false },
  code: { type: DataType.STRING, allowNull: true },
  url: { type: DataType.STRING, allowNull: false },
  description: { type: DataType.STRING, allowNull: false },
  flocculation: { type: DataType.STRING, allowNull: true },
  rangeF: { type: DataType.STRING, allowNull: true },
  rangeC: { type: DataType.STRING, allowNull: true },
  tolerance: { type: DataType.STRING, allowNull: true },
  attenuation: { type: DataType.STRING, allowNull: true },
  mfg: { type: DataType.STRING, allowNull: true },
  styles: { type: DataType.STRING, allowNull: true }
});

export default Yeast;
