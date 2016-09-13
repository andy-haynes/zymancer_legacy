import DataType from 'sequelize';
import Model from '../sequelize';

const UserProfile = Model.define('UserProfiles', {
  userId: {
    type: DataType.UUID,
    primaryKey: true
  },
  displayName: { type: DataType.STRING(100) },
  location: { type: DataType.STRING(100) },
  website: { type: DataType.STRING(256) }
});

export default UserProfile;
