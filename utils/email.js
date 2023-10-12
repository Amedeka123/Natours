const nodemailer = require('nodemailer')


const sendEmail = async options => {
 // create email transpoter
 const transpoter = nodemailer.createTransport({
    
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASSWORD
    }
 })

 //Define email option
 const mailOptions = {
    from:'israel amedeka <hello@israel.io>',
    to:options.email,
    subject:options.subject,
    text:options.text
 }

 // Actually send the mail
 await transpoter.sendMail(mailOptions)
}

module.exports = sendEmail