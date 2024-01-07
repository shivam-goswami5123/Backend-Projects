//Importing libraries
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//Initialisation
const app=express();
const port=3000;
const API_URL="https://www.thecocktaildb.com/api/json/v1/1";
const yourApiKey="1"; //No need for authorization as apiKey already present in API_URL

//Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Routes
app.get("/",async (req,res)=>{
    //Home Page of our web page
    res.render("first-page.ejs");
});

//Get any random drink
app.get("/random",async (req,res)=>{
    try{
        const response=await axios.get(API_URL+"/random.php");
        res.render("first-page.ejs",{content:response.data.drinks[0]});
    }
    catch(error){
        res.render("first-page.ejs",{content:error.message});
    }
});

//Get a specific drink by name
app.post("/specific-drink",async (req,res)=>{
    try{
        const name=req.body["dname"];
        const response=await axios.get(API_URL+"/search.php",{params:{s:name}});
        res.render("first-page.ejs",{content:response.data.drinks[0]});
    }
    catch(error){
        res.render("first-page.ejs",{content:error.message});
    }
});

//Render another page for listing cocktails
app.get("/list-page",async(req,res)=>{
    res.render("list-page.ejs");
});


//Get list of cocktails with a particular first letter
app.post("/list-cocktails",async (req,res)=>{
    try{
        const fletter=req.body["firstLetter"];
        const dtype=req.body["drinkType"];
        let response;
        if(fletter)
        {
            response=await axios.get(API_URL+"/search.php",{params:{f:fletter}});
            res.render("list-page.ejs",{content:response.data.drinks});
        }
        else if(dtype)
        {
            response=await axios.get(API_URL+"/filter.php",{params:{a:dtype}});
            res.render("list-page.ejs",{content:response.data.drinks});
        }
        else
            res.render("list-page.ejs");
    }
    catch(error){
        res.render("list-page.ejs",{content:error.message});
    }
});



app.listen(port,()=>{
    console.log(`Server is active at port:${port}`);
});

