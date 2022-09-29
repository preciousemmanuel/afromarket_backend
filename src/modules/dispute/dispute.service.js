const models = require('../../db/models')
var Sequelize = require('sequelize')
const imageUploader = require('../../common/helpers/cloudImageUpload')
const cloudinary = require('../../common/config/cloudinary')


const {
    sequelize,
    Dispute
} = models

exports.createDispute = async (payload) =>{
    try {
        const {userId, ordered_item_id, data} = payload

        const existingDispute = await Dispute.findOne({
            where: {OrderedItem: ordered_item_id}
        })
        
        if(existingDispute){

        }
        const newDispute= await Dispute.create(
            {
                ...data,
                OrderedItem: ordered_item_id,
                UserId: userId

            },
            {raw: true}
        )
        return {
            error: false,
            message: "Dispute creted successfully",
            data: newDispute
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to create a dispute at the moment",
            data: null
        }
        
    }
}

exports.uploadDisputeImages = async(payload)=>{
    try {
        const {dispute_id, file} = payload
        const url = await imageUploader(file)
        // const {url} = await cloudinary.uploader.upload(file)
        if(!url){
            return{
                code: 400,
                status: "error",
                message: "failed to upload dispute image image",
                data: null
            }
        }
        await Dispute.update(
            {product_image: url},
            {where:{id:dispute_id}}
        )
        const updatedDispute = await Dispute.findOne({id: dispute_id})
        return{
            error: false,
            message: "Image upload successful",
            data: updatedDispute
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

exports.getMyDisputes = async (data) =>{
    try {
        const {user_id} = data
        const dispute = await Dispute.findAll({
            where:{
                UserId: user_id,
            }
        })


        if(!dispute){
            return{
                error: true,
                message: 'No disputes found',
                data: null
            }
        } 

        return {
            error: false,
            message: "Disputes retreived successfully",
            data: dispute
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to view disputes at the moment",
            data: null
        }
        
    }
}

exports.viewDispute = async (data) =>{
    try {
        const {dispute_id, user_id} = data
        const dispute = await Dispute.findOne({
            where:{
                id: dispute_id,
                UserId: user_id,
            }
        })


        if(!dispute){
            return{
                error: true,
                message: 'Dispute not found',
                data: null
            }
        } 

        return {
            error: false,
            message: "Dispute retreived successfully",
            data: dispute
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to view dispute at the moment",
            data: null
        }
        
    }
}


exports.cancelDispute= async (payload) =>{
    const {dispute_id, user_id} = payload
    try {
        const foundDispute = await Dispute.findOne({
            where:{
                id: dispute_id,
                UserId:user_id
            }
        })


        if(!foundDispute){
            return{
                error: true,
                message: 'Dispute not found',
                data: null
            }
        } 
        await Dispute.destroy({
            where:{
                id: dispute_id,
                UserId:user_id
            }   
        })

        return {
            error: false,
            message: "Dispute cancelled successfully",
            data: null
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to cancel dispute at the moment",
            data: null
        }
        
    }
}