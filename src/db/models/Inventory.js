const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Inventory extends Model {
    static associate(models){
        this.belongsTo(models.Merchant, {as: 'Merchant'})
    }
  }
  Inventory.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      picture:{
        type: DataTypes.STRING,
        allowNull: false
      },
      picture_2:{
        type: DataTypes.STRING,
        allowNull: false
      },
      picture_3:{
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull:false
      },
      category: {
        type: DataTypes.STRING,
        allowNull:false
      },
      quantity_available: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      price: {
        type: DataTypes.INTEGER
      },
      isapproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      ratings: {
        type: DataTypes.INTEGER
      },
      invertory_owner:{
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: "Inventory",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Inventory
}