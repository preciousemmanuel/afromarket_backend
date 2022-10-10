const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Review extends Model {
    static associate(models){
      this.belongsTo(models.Product, {as: 'Product'}),
      this.belongsTo(models.User, {as:'User'})
    }
  }
  Review.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      value: {
        type: DataTypes.STRING
      },
      text: {
        type: DataTypes.INTEGER,
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Review",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Review
}