const express=require("express");
const multer=require("multer");
const path=require("path");
const bodyParser=require("body-parser");
const app=express();
const port=3000;

const {sendMailController}=require("./controllers/sendMail");

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let otp;

async function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber.toString().padStart(6, '0');
}


app.get("/",async (req,res)=>{
    res.render("index.ejs");
});

app.get("/verify-email",async (req,res)=>{
    res.render("verify-email.ejs");
});

app.post("/send-mail",async (req,res)=>{
    try{
    otp=await generateRandomNumber();
    const data={
        email:req.body["email"],
        otp:otp
    }
    sendMailController(req,res,data);
}
catch(error)
{
    console.log(error.message);
    res.send("Something Went Wrong ... Please go back to main page and fill information correctly then try again");
}
res.redirect("/verify-email");
});

app.post("/message-upon-verification",async (req,res)=>{
    const otpArray = req.body.otp;

    // Convert the array to a string
    const otpString = otpArray.join('');
  
    //console.log('OTP String:', otpString);
    if(otpString == otp){
        console.log("OTP Verification Successfull");
        res.redirect("https://nsutiif.in/");
    }
    else{
        console.log("OTP Verification Failed!! Please try again");
        res.redirect("/");
    }
});

const start=()=>{
    try{
        app.listen(port,()=>{
            console.log(`Server is active at port:${port}`);
        });
    }
    catch(error)
    {
        console.log(error.message);
    }
}

start();