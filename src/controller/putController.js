const express = require('express');
const { default: mongoose } = require('mongoose');
const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")
 




const updateblogs = async (req,res)=>{
    try{
    let id = req.params.blogId
    if(!id) return res.status(400).send({ status:false, msg: "plz write the blogId" }) ;

    if(!mongoose.isValidObjectId(id)) return res.status(400).send({ status:false, msg: "its not the objectId" });
    let checkId = await blogModel.findById(id)
    if(Object.keys(checkId)===0)  return res.status(400).send({ status:false, msg: "No blog with this Id" });
    let data = req.body
    let updateBlog = await blogModel.findByIdAndUpdate(
        {_id:id},
        {$set:{title:data.title , body:data.body },
         $push:{ tags : data.tags,subcategory:data.subcategory}},
        {new:true}
         )

         if(data["isPublished"]=== true){
            data["publishedAt"] = Date.now()
        }
        if(data["isDeleted"]=== true){
            data["deleteAt"] = Date.now()
        }

    res.send({status:true , data: updateBlog})
    }
    catch(err){
        res.status(500).send({status: "Error",error: err.message})
    }
}

module.exports.updateblogs=updateblogs
