const mongoose=require("mongoose");

const url="mongodb://localhost:27017/project";

mongoose.connect(url,(err)=>{
    if(!err)
    console.log("connection established.....");
    else
    console.log("connnection not established reason : "+JSON.stringify(err,undefined,2));
});

mongoose.exports=mongoose;
