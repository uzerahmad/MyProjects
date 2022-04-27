const express = require('express');
const { default: mongoose } = require('mongoose');
const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")
 




const getBlogs = async function(req,res){
    try
    { let fil = req.query
        // authorId validation
        let idCheck =mongoose.isValidObjectId(fil.authorId)
        if(!idCheck) return res.status(400).send({ status:false, msg: "authorId is not a type of objectId" })

      //body    
        let data = await blogModel.find({$and:[{isDeleted:false} , {isPublished:true},fil]})       
        if(data.length === 0) return res.status(404).send({status:false , msg:"Blogs not found"})
        res.status(200).send({status: true ,Data :data})

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: "error", error: err.message })
    }
}

module.exports.getBlogs=getBlogs
