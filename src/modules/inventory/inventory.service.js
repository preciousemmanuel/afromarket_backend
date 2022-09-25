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

// exports.uploadProductImages = async(payload)=>{
//     try {
//         const {product_id, file} = payload
//         const url = await imageUploader(file)
//         if(!url){
//             return{
//                 code: 400,
//                 status: "error",
//                 message: "failed to upload product image",
//                 data: null
//             }
//         }
//         await Product.update(
//             {picture: url},
//             {where:{id:product_id}}
//         )
//         const updatedProduct = await Product.findOne({id: product_id})
//         return{
//             error: false,
//             message: "Image upload successful",
//             data: updatedProduct
//         }

//     } catch (error) {
//         console.log(error);
//         return{
//             error: true,
//             message: "Unable to upload image at the moment",
//             data:error
//         }
//     }


// }

// exports.removeProduct = async (user, data) =>{
//     try {
//         const existingProduct = await Product.findOne({
//             where:{
//                 MerchantId: user.id,
//                 id: Number(data.id)
//             }
//         })

//         if(!existingProduct){
//             return{
//                 error: true,
//                 message: 'Cannot find selected product',
//                 data: null
//             }
//         }
//         await Product.destroy({
//             where:{
//                 id: Number(data.id),
//                 MerchantId:user.id
//             }   
//             })
//         return {
//             error: false,
//             message: "Product removed successfully",
//             data: null
//         }

//     } catch (error) {
//         console.log(error)
//         return{
//             error: true,
//             message: error.message|| "Unable to remove product at the moment",
//             data: null
//         }
        
//     }
// }