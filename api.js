/*jshint esversion:6*/
const express = require('express');
const mongoose = require("mongoose");
const models = require("./mongo.js");
const Router = express.Router();
const seed = require("../seed.js");
mongoose.connect("mongodb://saulgoodman:hackerman@ds163561.mlab.com:63561/freeways-memory");

console.log("hello from api");

Router.get("/trips/:slug",(req,res)=> {
  console.log("hello from ttrips");
  models.trips.find({slug:req.params.slug},(err,data)=>{
    if (err) {
      console.error("error looking up trip data");
    }else {
       res.send(data);
      }
  });
});

Router.get("/destination/:slug",(req,res)=> {
  models.destinations.find({slug:req.params.slug},(err,data)=>{
    if (err) {
      console.error("error looking up destination data "+err.stack);
    }else {
      res.send(data);
    }
  });
});

Router.get("/places/:slug",(req,res)=> {
  models.places.find({slug:req.params.slug},(err,data)=>{
    if (err) {
      console.error("error took place while looking up places");
    }else {
      res.send(data);
    }
  });
});
Router.get("/experiences/:slug",(req,res)=> {
  models.experiences.find({slug:req.params.slug},(err,data)=>{
    if (err) {
      console.error("error took place while looking up experiences");
    }else {
      res.send(data);
    }
  });
});
Router.get("/mustCarry/:slug",(req,res)=> {
  models.mustCarry.find({slug:req.params.slug},(err,data)=>{
    if (err) {
      console.error("error took place while looking up mustCarry");
    }else {
      res.send(data);
    }
  });
});
Router.get("/langauges/:slug",(req,res)=> {
  models.langauges.find({slug:req.params.slug},(err,data)=>{
    if (err) {
      console.error("error took place while looking up langauges");
    }else {
      res.send(data);
    }
  });
});

Router.get("/fresh",(req,res)=>{
  console.log("fresh");
     seed().then(fdata => {
       console.log(fdata);
       models.mustCarry.collection.insert(fdata['must-carries'],function(err,data){
         if (err) {
           console.error("error took place while adding mustCarry");
         }else {
           console.log("success while adding mustCarry");
           }
       });

       models.langauges.collection.insert(fdata['languages'],function(err,data){
         if (err) {
           console.error("error took place");

         }else {
           result["languages"]=data.length;
         }
       })

       models.places.collection.insert(fdata['places'],function(err,data){
         if (err) {
           console.error("error took place");
         }else {
             console.log("success while adding places");
         }
        })

       models.destinations.collection.insert(fdata['destinations'],function(err,data){
         if (err) {
           console.error("error destinations");
         }else {
           console.log("success while adding destinations");
         }
       })

       models.trips.collection.insert(fdata['trips'],function(err,data){
         if (err) {
           console.error("error in trips");
         }else {
           console.log("success while adding trips");
         }
       });

       models.experiences.collection.insert(fdata['experiences'],function(err,data){
         if (err) {
           console.error("error in experiences");
         }else {
           console.log("success while adding experiences");
         }
       });

    });

  res.send("fresh data has been added to the database")

})

module.exports= Router;
