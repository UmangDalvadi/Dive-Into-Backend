const fs= require("fs");

function fileFun(){
  return new Promise((resolve)=>{
    fs.readFile("00_a.txt","utf-8",(err,data)=>{
      resolve(data);
    })
  })
}

fileFun().then((data)=>{console.log(data)});


function timeOutFun(){
  return new Promise((resolve)=>{
    setTimeout(resolve, 3000);
  })
}

timeOutFun().then(()=>{
  console.log("hello! I'm here after 3 second");
})