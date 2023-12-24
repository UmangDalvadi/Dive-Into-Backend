const express= require("express");
const app=express();
const port=3000;
const bodyParser= require("body-parser");
const { render } = require("ejs");

// Steps to setup ejs:

// > install ejs module- npm i ejs
// > create 'views' directory and create 'index.ejs' file for html code
// > ser dir parh if views directory is in sub dir- app.set('views', '__dirPath');
// > configure ejs- app.set("view engine", "ejs");
// > use 'res.render' insted of 'res.send'
// > give fileName which is in the views dir to render, eg. res.render(index); 

app.set('views', './ejs/views')
app.set("view engine", "ejs");

app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.render('abc'); //render file name of ejs from views folder without .ejs
})

app.listen(port,()=>{
    console.log("Listening...");
})