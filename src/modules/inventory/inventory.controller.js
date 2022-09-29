const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const InventoryService = require('./inventory.service')

exports.addProductToInventoryController = async (req, res, next) => {
    try {
        const {error, message, data} = await InventoryService.addProductToInventory({
            merchant_id: req.userId, 
            product_id: req.params.id,
        })

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}

// exports.uploadProductImagesController = async (req, res, next) => {
//     try {
//         const {error, message, data} = await ProductService.uploadProductImages({
//             product_id: req.params.id,
//             file: req.file.path
//         })

//         if (error) {
//         return next(
//             createError(HTTP.BAD_REQUEST, [
//             {
//                 status: RESPONSE.ERROR,
//                 message,
//                 statusCode:
//                 data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
//                 data,
//             },
//             ])
//         );
//         }
//         return createResponse(message, data)(res, HTTP.CREATED);
//     } catch (error) {
//         console.error(error);

//         return next(createError.InternalServerError(error));
//     }
// }


// exports.removeProductController = async (req, res, next) => {
//     try {
//         const {error, message, data} = await ProductService.removeProduct(
//             req.user, 
//             req.params
//         )

//         if (error) {
//         return next(
//             createError(HTTP.BAD_REQUEST, [
//             {
//                 status: RESPONSE.ERROR,
//                 message,
//                 statusCode:
//                 data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
//                 data,
//             },
//             ])
//         );
//         }
//         return createResponse(message, data)(res, HTTP.CREATED);
//     } catch (error) {
//         console.error(err);

//         return next(createError.InternalServerError(err));
//     }
// }

