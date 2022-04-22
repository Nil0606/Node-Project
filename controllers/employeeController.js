const express = require("express");
var router = express.Router();
var { Employee } = require("../models/user.js");
var ObjectId=require("mongoose").Types.ObjectId;
router.get("/list", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in retrivig information : " + JSON.stringify(err, undefined, 2));
    }
  });
});

router.get("/list/:id",(req,res)=>{
  if(!ObjectId.isValid(req.params.id)){
    return res.status(400).send(`No recrd with give id : ${req.params.id}`);
  }

  Employee.findById(req.params.id,(err,doc)=>{
    if(!err){
      res.send(doc);
    }
    else{
      console.log("Error in retrivig information : " + JSON.stringify(err, undefined, 2));
    }
  });  
});

router.put("/list/update/:id",(req,res)=>{
   if (!ObjectId.isValid(req.params.id)) {
     return res.status(400).send(`No recrd with give id : ${req.params.id}`);
   }
   var emp={
     name:req.body.name,
     position:req.body.position,
     salary:req.body.salary,
     office:req.body.office,
   }
   Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,doc)=>{
      if(!err){res.send(doc);}
      else {console.log("Error in retrivig information : " + JSON.stringify(err, undefined, 2));}
   });
});

router.delete("/list/delete/:id",(req,res)=>{
   if (!ObjectId.isValid(req.params.id)) {
     return res.status(400).send(`No recrd with give id : ${req.params.id}`);
   }
   Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
      if (!err) {
        res.send(doc);
      } else {
        console.log("Error in retrivig information : " + JSON.stringify(err, undefined, 2));
      }
   });
});

router.post("/post",(req,res)=>{
    var emp=new Employee({
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary,
    });
    emp.save((err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log("Error in employee save : "+JSON.stringify(err,undefined,2));}
    });
});
module.exports = router;
