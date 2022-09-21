const models = require('../../db/models')
var Sequelize = require('sequelize')

const {
    sequelize,
    Product
} = models

exports.uploadProduct = async (user, data) =>{
    try {
        const existingProduct = await Product.findOne({
            where:{
                MerchantId: user.id,
                name: data.name
            }
        })

        if(existingProduct){
            return{
                error: true,
                message: 'You already uploaded a product with same name',
                data: null
            }
        }
        const newProduct= await Product.create(
            {
                ...data,
                MerchantId:user.id
            },
            {raw: true}
        )
        return {
            error: false,
            message: "Product uploaded successfully",
            data: newProduct
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to upload product at the moment",
            data: null
        }
        
    }
}

exports.removeProduct = async (user, data) =>{
    try {
        const existingProduct = await Product.findOne({
            where:{
                MerchantId: user.id,
                id: Number(data.id)
            }
        })

        if(!existingProduct){
            return{
                error: true,
                message: 'Cannot find selected product',
                data: null
            }
        }
        await Product.destroy({
            where:{
                id: Number(data.id),
                MerchantId:user.id
            }   
            })
        return {
            error: false,
            message: "Product removed successfully",
            data: null
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to remove product at the moment",
            data: null
        }
        
    }
}