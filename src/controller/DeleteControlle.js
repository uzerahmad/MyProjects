const express = require('express');
const { default: mongoose } = require('mongoose');
const { update } = require('../model/authorModel');
const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")
 



    const deletById=async (req,res)=>{
        try{
            let data=req.params.blogId
            
            let idCheck = mongoose.isValidObjectId(blogId)
        
            if(!idCheck) return res.status(400).send({ status:false, msg: "blogId is not a type of objectId" })

            let status= await blogModel.findById(blogId)
            if(!status) return res.status(404).send({msg :"this blog is not present"})


            if(status.isDeleted ===true) return  res.status(404).send({ status:false, msg: "this blog is already deleted" })
            let token =req["authorId"]
            if(status.authorId!= token){
                return res.status(403).send({status:false,msg:"You are not authorized to access this data"})
            }
            
            let delteblog = await blogModel.findByIdAndUpdate(data,{$set:{isDeleted:true,deleteAt: Date.now()}},{new:true})
            return res.status(200).send("")    
           
        }    
        catch (err) {
            console.log(err.message)
            res.status(500).send({ status: "error", error: err.message })
        }
    }


    const deletByProperty=async (req,res)=>
    {
        try{
            let data = req.body
            const {category,tags,authorId,subcategory} = data
            let token =req["authorId"]
            let document = {
                isDeleted: false,
                authorId:token,
                ...data
            }
            if(data === undefined||Object.values(data).length===0){
                 return res.status(400).send({status: false,msg :"plz enter the data"})
            }
            
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

            if(!(authorId||category||tags||subcategory)) {
                return res.status(404).send({msg:"Plz enter valid data for deletion"})
            }

            let exist = await blogModel.find(data,{isDeleted:false})
            
            
            if(!exist) return res.status(404).send({msg :"blog is not present in db"})

            let property=await blogModel.updateMany( document,{$set:{isDeleted:true,deleteAt: Date.now()}},{new:true})

            if(!property) return res.status(404).send({status: false,msg :"blog doesn't exist"})
    
                   res.status(200).send({status:true,msg:property})
        }
        catch (err) {
            console.log(err.message)
            res.status(500).send({ status: "error", error: err.message })
        }
    }
     
 


module.exports.createAuthor = createAuthor


module.exports.deletById=deletById

module.exports.deletByProperty=deletByProperty
