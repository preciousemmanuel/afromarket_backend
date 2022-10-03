const models = require('../../db/models')
var Sequelize = require('sequelize')
const imageUploader = require('../../common/helpers/cloudImageUpload')
const {getPaginatedRecords, getPaginatedRecordsMultipleRecords} = require('../../common/helpers/paginate')

const {
    sequelize,
    Category,
    Product,
    Inventory
} = models

exports.getAllCategories = async (data) =>{
    try {
        const {limit, page} = data
        const allCategories = await getPaginatedRecords(Category, {
            limit: Number(limit),
            page: Number(page),
            selectedFields: ["id", "name",  "description"]
        })
        return {
            error: false,
            message: "Categories retreived successfully",
            data: {
                allCategories: allCategories,
                pagination: allCategories.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive categories at the moment",
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
            {where:
                {
                    id:product_id,
                    deleted: false
                },
                
            }
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

exports.getAllProductsInACategory = async (data) =>{
    try {
        const {limit, page, category_id} = data
        const allResults = await getPaginatedRecordsMultipleRecords(
            Product, Inventory, {
            limit: Number(limit),
            page: Number(page),   
            data1 :{ CategoryId: category_id},
            data2 :{ CategoryId: category_id},
            selectedFields1 : ['name', 'quantity_available', 'price', 'description'],
            selectedFields2 : ['name', 'quantity_available', 'price', 'description']     
            }
        )
        return{
            error: false,
            message: "Product retreived successfully",
            data: {
                allProducts: allResults,
                pagination: allResults.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive products under this category at the moment",
            data: null
        }
        
    }
}
