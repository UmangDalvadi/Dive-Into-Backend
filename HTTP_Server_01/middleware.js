const express= require("express");
const app= express();
const port=3000;
const bodyParse= require("body-parser");

app.use(bodyParse.json()); //used for parsing body data, like it's a binary, text, number or json etc... 

app.use((req, res, next)=>{
    // This is a middleware which takes 3 args
    // and it's runs for all roughts
    // it's simple function which runs before all roughts
    // req: it contain data about user who want to access the server
    // res: it contain data about server, which we want to respond
    // next: it point to rought, which we want to execute after this middleware
    // we can create multiple middleware
    next();
});

// rought 1
app.get("/", (req, res)=>{
    res.send("hello world");
});

// rought 2 - Dynamic rought
app.get("/profile/:username", (req,res)=>{
    res.send(`${req.params.username}`);
    // when some part of rought is same for multiple rought than we can create dynamic rought
    // eg. /profile/umang
    //     /profile/vikash
    //     /profile/keval
    // insted of making multiple rought we can create dynamic rought for this type of rought
    // eg. /profile/:username

    // we can create dynamic rought using :<Kuchh_bhi>
    // than we can access value of dynamic rought by req.params.<as_per_above(Kuchh_bhi)>
    // Here req. -> because we are sending request, so data is stored in req parameters
    // params. -> means our dynamic variable eg. <Kuchh_bhi>
})

app.listen(port,()=>{
    console.log("Listening...");
})


