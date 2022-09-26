const models = require('../../db/models')
var Sequelize = require('sequelize')
const {hashPassword, comparePassword} = require('../../common/helpers/password')
const {jwtDecode, jwtSign, jwtVerify} = require('../../common/helpers/token')
const {
    sequelize,
    User
} = models

exports.registerUser = async (data) =>{
    try {
        let password
        if(data.password){
            password = hashPassword(data.password)
        }
        const existingUser = await User.findAll({
            where:{
                email: data.email
            }
        })

        if(existingUser){
            return{
                error: true,
                message: 'Email already exist on the server',
                data: null
            }
        }
        const newUser = await User.create(
            {
                ...data,
                password: data.password? password: null
            },
            {raw: true}
        )
        return {
            error: false,
            message: "User registered successfully",
            data: newUser
        }

    } catch (error) {
        console.log(error)
        return{
            message: error.message|| "Unable to register user at the moment",
            data: null
        }
        
    }
}

exports.loginUser = async(user, data) => {
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
        await User.update(
            {refreshTokens: refreshToken},
            {where: {id: user.id}}
        )
        const loginUser = await User.findOne({
            attributes:['email','fullname', 'id'],
            where: {id:user.id}
        })

        return{
            error: false,
            message: 'Login successful',
            data: {loginUser, accesstoken: refreshToken}
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log in user at the moment",
            data: null
        }
    }
}