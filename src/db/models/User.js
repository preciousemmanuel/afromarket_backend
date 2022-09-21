const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class User extends Model {
    static associate(models){

    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      fullName: {
        type: DataTypes.STRING
      },
      email: {
        unique: true,
        type: DataTypes.STRING,
      },
      phone_number:{
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      refreshTokens: {
        type: DataTypes.STRING
      },

    },

    {
      sequelize,
      modelName: "User",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return User
}