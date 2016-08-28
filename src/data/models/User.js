import DataType from 'sequelize';
import Model from '../sequelize';

const User = Model.define('User', {
  id: {
    type: DataType.INTEGER,
    defaultValue: 1,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true }
  },
  emailConfirmed: {
    type: DataType.BOOLEAN,
    defaultValue: false
  }
}, {
  indexes: [
    { fields: ['email'] }
  ]
});

export default User;
