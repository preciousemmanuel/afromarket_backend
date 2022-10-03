const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Dispute extends Model {
    static associate(models){
      this.belongsTo(models.User, {as: "User"}),
      this.belongsTo(models.OrderedItem, {as:"OrderedItem"})
    }
  }
  Dispute.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      product_image: {
        type: DataTypes.STRING,
      },
      reason: {
        type: DataTypes.ENUM,
        values:['Wrong Order', 'Lost Order', 'Damaged Product', 'Fake Product']
      },
      status: {
       type: DataTypes.ENUM,
        values:['Initiated','Won', 'On_Going', 'Lost'],
        defaultValue: 'Initiated'
      },
      description: {
        type: DataTypes.STRING,
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "Dispute",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Dispute
}