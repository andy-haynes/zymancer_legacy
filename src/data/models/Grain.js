import DataType from 'sequelize';
import Model from '../sequelize';

const Grain = Model.define('Grains', {
  id: { type: DataType.INTEGER, primaryKey: true },
  name: { type: DataType.STRING, allowNull: false },
  category: { type: DataType.STRING, allowNull: true },
  lovibond: { type: DataType.STRING, allowNull: true },
  gravity: { type: DataType.DECIMAL, allowNull: false },
  description: { type: DataType.STRING, allowNull: false }
});

export default Grain;
