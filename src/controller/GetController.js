const express = require('express');
const { default: mongoose } = require('mongoose');
const { update } = require('../model/authorModel');
const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")
 




const getBlogs = async function(req,res){
    try
    { let data1 = req.query
        const {authorId,category,tags,subcategory} = data1

        
        let token =req["authorId"]
        
        if(authorId){
            if(!mongoose.isValidObjectId(authorId))
            {
                return res.status(400).send({ status:false, msg: "authorId is not a type of objectId" })   
            }
            
                if(token!=authorId)
                {
                    return res.status(403).send({status:false,msg:"You are not authorized to access this data"})
                }
        }       
        let filter ={isDeleted:false,isPublished:true,...data1}
         
        if(!(authorId ||tags||category ||subcategory)) return res.status(404).send({status:false,msg:"not  valid filter"})

        let data = await blogModel.find({$and:[filter,{authorId:token}]})      
        if(data.length === 0){
            return res.status(404).send({status:false , msg:"Blogs not found"})
        }

        return res.status(200).send({status: true ,Data :data})
        }

        
    
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: "error", error: err.message })
    }
}




module.exports.getBlogs=getBlogs
