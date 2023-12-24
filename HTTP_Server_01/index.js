const express= require("express");
const app=express();
const bodyParser= require("body-parser");
const port= 3000;

app.use(bodyParser.json());

app.post('/',(req,res)=>{
    console.log(req.body);
    res.send("Hello world2" );
})

app.listen(port,()=>{
    
    console.log("dsf")
})