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

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/') // Folder where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // Keeping the original file name
    }
  });

const upload = multer({ storage: storage });

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/send-mail",upload.single("file"),(req,res)=>{
    try{
    const data={
        receiverAddress : req.body["to"],
        mailSubject : req.body["subject"],
        mailBody : req.body["body"],
        // File details
        filePath : req.file.path, // File path in the server
        fileName : req.file.originalname, // Original file name
        fileType : path.extname(req.file.originalname) // File extension
    }
    sendMailController(req,res,data);
}
catch(error)
{
    console.log(error.message);
    res.send("Something Went Wrong ... Please go back to main page and fill information correctly then try again");
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