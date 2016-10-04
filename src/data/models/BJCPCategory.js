import DataType from 'sequelize';
import Model from '../sequelize';

const BJCPCategory = Model.define('BJCPCategories', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataType.STRING, allowNull: false },
  description: { type: DataType.TEXT, allowNull: false }
});

export default BJCPCategory;