import DataType from 'sequelize';
import Model from '../sequelize';

const UserProfile = Model.define('UserProfile', {
  userId: {
    type: DataType.INTEGER,
    primaryKey: true
  },
  displayName: { type: DataType.STRING(100) },
  location: { type: DataType.STRING(100) },
  website: { type: DataType.STRING(255) }
});

export default UserProfile;
