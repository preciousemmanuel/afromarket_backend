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
             attributes: ['id', 'name', 'picture', 'picture_2', 'picture_3', 'description', 'quantity_available', 'price', 'isApproved', 'ratings', 'MerchantId', 'CategoryId', ],
            where:{
                id: product_id
            },
        })
        console.log(existingProduct);
        const existingInventory = await Inventory.findOne({
            where:{
                inventory_owner: merchant_id,
                MerchantId: existingProduct.MerchantId,
                name: existingProduct.name
            }
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
                name: existingProduct.name,
                product_id: existingProduct.id,
                picture: existingProduct.picture,
                picture_2: existingProduct.picture_2,
                picture_3: existingProduct.picture_3,
                description: existingProduct.description,
                quanitity_available: existingProduct.quantity_available,
                price: existingProduct.price,
                isApproved: existingProduct.isApproved,
                ratings: existingProduct.ratings,
                MerchantId: existingProduct.MerchantId,
                inventory_owner: merchant_id 
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



exports.singleInventoryItem = async (payload) =>{
    const {inventory_id, inventory_owner} = payload
    try {
        const existingInventory = await Inventory.findOne({
            where:{
                id: inventory_id,
                inventory_owner,
            }
        })


        if(!existingInventory){
            return{
                error: true,
                message: 'Product not found under your inventories',
                data: null
            }
        } 

        return {
            error: false,
            message: "Product retreived from your inventory successfully",
            data: existingInventory
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive product from your inventory at the moment",
            data: null
        }
        
    }
}


exports.removeProductFromInventory = async (payload) =>{
    const {inventory_id, inventory_owner} = payload
    try {
        const existingInventory = await Inventory.findOne({
            where:{
                id: inventory_id,
                inventory_owner,
            }
        })


        if(!existingInventory){
            return{
                error: true,
                message: 'Product not found under your inventories',
                data: null
            }
        } 
        await Inventory.destroy({
            where:{
                id: inventory_id,
                inventory_owner
            }   
        })

        return {
            error: false,
            message: "Product removed from your inventory successfully",
            data: null
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to remove product from your inventory at the moment",
            data: null
        }
        
    }
}