import express from "express";
import bodyParser from "body-parser";
const app=express();
const port=3000;

let count=0;
let posts=[];
//Middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Routes
app.get("/",(req,res)=>{
    res.render("home.ejs",{posts,count:count});
});

app.get("/create",(req,res)=>{
    res.render("create-post.ejs");
});

app.post("/create",(req,res)=>{
    const newPost=req.body["workspace"];
    count++;
    posts.push(newPost);
    res.redirect("/"); 
});

app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    res.render('edit-post.ejs', { post, postId });
});

app.post('/edit/:id',(req,res)=>{
    const postId=req.params.id;
    const content=req.body["workspace"];
    posts[postId]=content;
    res.redirect("/");
});

app.post("/delete/:id",(req,res)=>{
    const postId=req.params.id;
    posts.splice(postId,1);
    count--;
    res.redirect("/");
});

app.listen(port,()=>{
    console.log(`Server running active at port:${port}`);
});

