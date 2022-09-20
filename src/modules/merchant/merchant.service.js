const models = require('../../db/models')
var Sequelize = require('sequelize')
const {hashPassword, comparePassword} = require('../../common/helpers/password')
const {jwtDecode, jwtSign, jwtVerify} = require('../../common/helpers/token')
const {
    sequelize,
    Merchant
} = models

exports.registerMerchant = async (data) =>{
    try {
        let password
        if(data.password){
            password = hashPassword(data.password)
        }
        const existingMerchant = await Merchant.findAll({
            where:{
                email: data.email
            }
        })

        if(!existingMerchant){
            return{
                error: true,
                message: 'Email already exist on the server',
                data: null
            }
        }
        const newMerchant = await Merchant.create(
            {
                ...data,
                password: data.password? password: null
            },
            {raw: true}
        )
        return {
            error: false,
            message: "merchant registered successfully",
            data: newMerchant
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to register user at the moment",
            data: null
        }
        
    }
}

exports.loginMerchant = async(user, data) => {
    try {
        if(data.password){
            const passwordMatch = await comparePassword(user.password, data.password)
            if (!passwordMatch) {
                return {
                    error: true,
                    message: "Incorrect password.",
                };
            }
        }
         if(!data.password && !data.auth_type){
            return {
                error: true,
                message: "Invalid Authorization",
            };
        }

        const refreshToken = jwtSign(user.id)
        await Merchant.update(
            {refreshTokens: refreshToken},
            {where: {id: user.id}}
        )
        const loginMerchant = await Merchant.findOne({
            attributes:['email','fullname', 'id', 'phone_number'],
            where: {id:user.id}
        })

        return{
            error: false,
            message: 'Login successful',
            data: {loginMerchant, accesstoken: refreshToken}
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log in merchant at the moment",
            data: null
        }
    }
}