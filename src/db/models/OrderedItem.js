const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class OrderedItem extends Model {
    static associate(models){
      this.belongsTo(models.Order, {as: "Order"})
    }
  }
  OrderedItem.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      product_id:{
        type: DataTypes.INTEGER
      },
      product_name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity_ordered:{
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: false,
      },
      total: {
        type: DataTypes.INTEGER,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "OrderedItem",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return OrderedItem
}