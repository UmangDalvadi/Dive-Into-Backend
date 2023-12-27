const express= require("express");
const app=express();
const bodyParser= require("body-parser");
const port= 3000;

app.use(bodyParser.json());

app.post('/',(req,res)=>{
    console.log(req.body);
    res.send("Success" );
})

app.listen(port,()=>{
    
    console.log("dsf")
})