const nodemailer=require("nodemailer");
require("dotenv").config(); //attach env variables to system variables


let emailsent=false;

const sendMail=async (req,res,data)=>{
    try{
      if(!emailsent){
    //set up SMTP(simple mail transfer protocol) server
    const transporter = await nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, //for port 465 set it true else false
        auth: {
          user: process.env.USER, //sender's gmail account
          pass: process.env.APP_PASSWORD, //sender's gmail app password
        },
      });

    //send mail with defined transport object
    const info = await transporter.sendMail({
    from:{
        name:process.env.NAME, //name of sender's gmail account
        address:process.env.USER
    } , // sender address
    to: data.receiverAddress, // list of receivers ; write receiver's gmail address in place of ...
    subject: data.mailSubject, // Subject line
    text: data.mailBody, // plain text body
    // html: "<b>Hello world</b>", // html body
    //if want to add attachments
    attachments:[
        {
            filename:data.fileName,
            path:data.filePath,
            contentType:data.fileType
        }
    ]
    //can add more options like cc and all that......
  }); 
  console.log("Email has been sent successfully!!")
  console.log(`Message Id:${info.messageId}`);
  res.send("Email has been sent successfully!!");
  emailsent=true;
      }
      else{
          console.log("Email has been already sent!!!!");
      }
}
catch(error)
{
    console.log(error.message);
}  
}


// Exporting as a controller
module.exports.sendMailController = sendMail;
