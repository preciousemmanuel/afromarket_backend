const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Category extends Model {
    static associate(models){
        this.hasMany(models.Product, {as: 'Product'})
    }
  }
  Category.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      modelName: "Category",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Category
}