const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Product extends Model {
    static associate(models){
        this.belongsTo(models.Merchant, {as: 'Merchant'})
    }
  }
  Product.init(
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
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Product
}