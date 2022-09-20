const models = require('../../db/models')
var Sequelize = require('sequelize')

const {
    sequelize,
    User
} = models

exports.registerUser = async (data) =>{
    try {
        const existingUser = await User.findAll({
            where:{
                email: data.email
            }
        })

        if(existingUser){
            return{
                error: true,
                message: 'Email already existon the server',
                data: null
            }
        }
        const newUser = await User.create(data, {raw: true})
        return {
            error: false,
            message: "User registered successfully",
            data: newUser
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