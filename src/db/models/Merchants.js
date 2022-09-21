const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Merchant extends Model {
    static associate(models){
        this.hasMany(models.Product, {as: 'Product'})
    }
  }
  Merchant.init(
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
      password: {
        type: DataTypes.STRING,
      },
      phone_number:{
        type: DataTypes.STRING,
        allowNull: true
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
      ratings: {
        type: DataTypes.INTEGER
      }
  
    },
    {
      sequelize,
      modelName: "Merchant",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Merchant
}