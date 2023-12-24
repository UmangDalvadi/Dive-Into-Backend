const express= require("express");
const app=express();
const port=3000;
const bodyParser= require("body-parser");
const { render } = require("ejs");

// Steps to setup ejs:

// > install ejs module- npm i ejs
// > create 'views' directory and create 'index.ejs' file for ejs code
// > ser dir parh if views directory is in sub dir- app.set('views', '__dirPath');
// > configure ejs- app.set("view engine", "ejs");
// > use 'res.render' insted of 'res.send'
// > give fileName which is in the views dir to render, eg. res.render(fileName, dataValues); 

app.set('views', './Static_files/views')
app.set("view engine", "ejs");

app.use(express.static('./Static_files/public'))

app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.render('abc', {name:'Umang'}); //render file name of ejs from views folder without .ejs
    // second arg is converting name variable (whenever we are using name as a variable in page) into allocated value
})

app.listen(port,()=>{
    console.log("Listening...");
})