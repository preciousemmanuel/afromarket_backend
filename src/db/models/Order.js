const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Order extends Model {
    static associate(models){
      this.belongsTo(models.User, {as: "User"})
      this.hasMany(models.OrderedItem, {as: "OrderedItem"})
    }
  }
  Order.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      items: {
        type: DataTypes.STRING,
        get(){
          return this.getDataValue('items').split(';')
        },
        set(val){
          this.setDataValue('items', val.join(';'))
        }
      },
        isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      payment_type: {
        type: DataTypes.ENUM,
        values: ["pay-now", "on-delivery"],
        defaultValue: "on-delivery"
      },
      order_cost: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      status:{
        type: DataTypes.ENUM,
        values: ["canceled", "active"],
        defaultValue: "active"
      }
    },
    {
      sequelize,
      modelName: "Order",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Order
}