import DataType from 'sequelize';
import Model from '../sequelize';

const MashSchedule = Model.define('MashSchedule', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  recipeId: { type: DataType.INTEGER, allowNull: false },
  style: { type: DataType.STRING, allowNull: false },
  thickness: { type: DataType.JSON, allowNull: false },
  absorption: { type: DataType.JSON, allowNull: false },
  boilOff: { type: DataType.JSON, allowNull: false },
  grainTemp: { type: DataType.JSON, allowNull: false },
  infusionTemp: { type: DataType.JSON, allowNull: false },
  mashoutTemp: { type: DataType.JSON, allowNull: false }
});

export default MashSchedule;