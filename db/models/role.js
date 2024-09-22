'use strict'
import { Model } from 'sequelize'
export default function buildRoleModel (sequelize, DataTypes) {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.User)
    }
  }
  Role.init(
    {
      role: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Role'
    }
  )
  return Role
}
