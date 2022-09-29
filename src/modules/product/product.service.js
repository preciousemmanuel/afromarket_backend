const models = require('../../db/models')
var Sequelize = require('sequelize')
// const cloudinary = require('../../common/config/cloudinary')
const imageUploader = require('../../common/helpers/cloudImageUpload')

const {
    sequelize,
    Product
} = models

exports.uploadProduct = async (payload) =>{
    try {
        const {user, data} = payload
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
                MerchantId:user.id,
               
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

exports.uploadProductImages = async(payload)=>{
    try {
        const {product_id, file} = payload
        const url = await imageUploader(file)
        if(!url){
            return{
                code: 400,
                status: "error",
                message: "failed to upload product image",
                data: null
            }
        }
        await Product.update(
            {picture: url},
            {where:{id:product_id}}
        )
        const updatedProduct = await Product.findOne({id: product_id})
        return{
            error: false,
            message: "Image upload successful",
            data: updatedProduct
        }

    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: "Unable to upload image at the moment",
            data:error
        }
    }


}

exports.getSingleProduct = async (data) =>{
    try {
        const existingProduct = await Product.findOne({
            where:{
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
        return {
            error: false,
            message: "Product retreived successfully",
            data: existingProduct
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive product at the moment",
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