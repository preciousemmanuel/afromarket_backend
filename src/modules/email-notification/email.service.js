const models = require('../../db/models')
var Sequelize = require('sequelize')
const randomString = require('../../common/helpers/randString')
const nodemailer = require('nodemailer')
const KEYS = require('../../common/config/keys')

const {
    sequelize,
    Order,
    Product,
    OrderedItem,
    Inventory,
    Tracker
} = models

exports.sendOTPtoMail = async (data) =>{
    try {
        const{email, mailSubject, fullName, otp} = data
        const firstName = fullName.split(' ')[1]
        const message = {
            from: KEYS.mailSender,
            to: email,
            subject: mailSubject,
            html: `<h1>Hello ${firstName}, here's your otp:</h1> <h2>${otp}</h2>`

        }
        let transporter =  nodemailer.createTransport({
            host: KEYS.mailHost,
            service:'Gmail',
            auth:{
                user: KEYS.mailAuthUser,
                pass: KEYS.mailAuthPass
            }
        })

      let info =  await  transporter.sendMail(message)
        if(!info){
            return{
                error: true,
                message: "Unable to send email at the moment",
                data: null
            }
        }
        return{
            error: false,
            message: `Successfully sent mail to: ${email}`,
            data: info
        }
         
    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to send email at the moment",
            data: null
        }
        
    }
}

