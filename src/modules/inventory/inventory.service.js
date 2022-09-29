const models = require('../../db/models')
var Sequelize = require('sequelize')

const {
    sequelize,
    Product,
    Inventory
} = models

exports.addProductToInventory = async (data) =>{
    try {
        const {merchant_id, product_id} = data
        const existingProduct = await Product.findOne({
             attributes: {exclude: ['password', 'id']},
            where:{
                id: product_id
            }
        })

        const existingInventory = await Inventory.findOne({
            where:{invertory_owner: merchant_id}
        })


        if(!existingProduct){
            return{
                error: true,
                message: 'Product not found',
                data: null
            }
        } 
        if((String(existingProduct.MerchantId) === merchant_id) || existingInventory){
            return{
                error: true,
                message: "Product already part of your inventory",
                data: null
            }
        }
        const newInventory= await Inventory.create(
            {
                ...existingProduct,
                invertory_owner:merchant_id,
            },
            {raw: true}
        )
        return {
            error: false,
            message: "Product added to inventory successfully",
            data: newInventory
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to add product to inventory at the moment",
            data: null
        }
        
    }
}
