const express = require('express');
const { default: mongoose } = require('mongoose');
const { update } = require('../model/authorModel');
const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")
 


const createAuthor = async (req, res) => {
     try{
         let data = req.body
        //  data validation
        
        if(Object.keys(data).length===0) return res.status(400).send({ status:false, msg: "plz enter some data" })

        // FirstName validation
        if(!data.firstName)  return res.status(400).send({ status:false, msg: "firstName must be present" });
        if(typeof data.firstName !== "string") return res.status(400).send({ status:false, msg: "firstName should be string" });

        // lastName validation
        if(!data.lastName)  return res.status(400).send({ status:false, msg: "Last name must be present" });
        if(typeof data.lastName !== "string") return res.status(400).send({ status:false, msg: "LastName should be string" });

        // title validation
        if(!data.title)  return res.status(400).send({ status:false, msg: "title must be present" });
        if(typeof data.title !== "string") return res.status(400).send({ status:false, msg: "title should be string" });
        if(!( ["Mr", "Mrs", "Miss"].includes(data.title))) return res.status(400).send({status: false,msg:"title can only have Mr,Mrs,Miss"})
        
        // email validation
        if(!data.email)  return res.status(400).send({ status:false, msg: "email must be present" });
        let y = data.email
        let regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z])+\.([a-z]+)(.[a-z])?$/
        let x = y.match(regx)
        if(!x) return res.send({status:false,msg:"please enter valid email address"})
         let mail = await authorModel.findOne({email:y})
         console.log(mail)
         if(mail) return res.status(400).send({status: false,msg:"this email is already present"})

        // password validation
        if(!data.password)  return res.status(400).send({ status:false, msg: "plz write the password" });
        if(typeof data.firstName !== "string") return res.status(400).send({ status:false, msg: "password should be string" });

        let author = await authorModel.create(data)
        res.status(201).send({ status: true, Data: author })
    }
    catch(err){
        res.status(500).send({status: "error" , msg: err.message})
    }
}



const createBlogs = async function(req, res) {
    try {
        const data = req.body
        //  data validation
        
        if(Object.keys(data).length===0) return res.status(400).send({ status:false, msg: "plz enter some data" })
        // title validation
        if (!data.title) {
            return res.status(400).send({ status:false, msg: "title is not given" })
        }
        if(typeof data.title !== "string") return res.status(400).send({ status:false, msg: "title should be string" });

        // body validation
        if (!data.body) {
            return res.status(400).send({status:false, msg: "body is not Given" })
        }
        if(typeof data.title !== "string") return res.status(400).send({ status:false, msg: "body should be string" });
        
        // authorId validation
        let authorId = data.authorId
        if (!authorId) {
            return res.status(400).send({ status:false,msg: "authorId must be present" })
        }
        let idCheck =mongoose.isValidObjectId(authorId)
        if(!idCheck) return res.status(400).send({ status:false, msg: "authorId is not a type of objectId" })

        const id = await authorModel.findById(authorId)
        if (!id) {
            return res.status(404).send({ status: false, msg: "invalid authorId" })
        }

        if (!data.category) {
            return res.status(400).send({status:false, msg: "category must be present" })
        }

        const Blog = await blogModel.create(data)
        return res.status(201).send({ status: true, msg: Blog })
    } catch (err) {
        res.status(500).send({ status: "error", error: err.message })
    }
}

const getBlogs = async function(req,res){
    try
    { let data1 = req.query
        const {authorId,category,tags,subcategory} = data1

        // authorId = fil.authorId
        // category = fil.category
        // tags=fil.tags
        // subcategory=fil.subcategory  
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
         
        if(!authorId &&!tags&& !category && !subcategory) return res.send("not  valid filter")

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



const updateblogs = async function(req,res){

     try{
        let blogId = req.params.blogId;

        let data = req.body
        const {title,body,tags,subcategory}=data

        let idCheck = mongoose.isValidObjectId(blogId)
        
        if(!idCheck) return res.status(400).send({ status:false, msg: "blogId is not a type of objectId" })

        let status= await blogModel.findById(blogId)
        if(!status) return res.status(404).send({msg :"this blog is not present"})


        if(status.isDeleted ===true) return  res.status(404).send({ status:false, msg: "this blog is already deleted" })
        let token =req["authorId"]
        if(status.authorId!= token){
            return res.status(403).send({status:false,msg:"You are not authorized to access this data"})
        }
        if(title){
            if(title===undefined){
                return req.status(400).send({status:false,msg:"enter data in title field"})
            }
            if(typeof title !== 'string'){
                return req.status(400).send({status:false,msg:"title should be string"})
            }
        }
        if(body){
            if(body===undefined){
                return req.status(400).send({status:false,msg:"enter data in body field"})
            }
            if(typeof body !== 'string'){
                return req.status(400).send({status:false,msg:"Body should be string"})
            }
        }
    
        if(!(title||body||tags||subcategory)) {return res.status(404).send({status:false,msg:"Plz enter valid keys for updation "})}
        
        const updateblogs = await blogModel.findByIdAndUpdate(  
        {blogId},
        {$addToSet:{tags:tags,subcategory:subcategory},
         $set : { title: title, body: body}
        },
        { new: true });
        console.log(updateblogs)

        if (updateblogs.isPublished === true) {
             updateblogs["pulbishedAt"] = Date.now()
        
        }
        return res.status(200).send({ status: true,data:updateblogs ,msg: "successfully Update blog details"});
    }
      
    catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: "error", error: err.message })
    } 


}

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

module.exports.createBlogs = createBlogs
module.exports.getBlogs=getBlogs
module.exports.updateblogs=updateblogs
module.exports.deletById=deletById

module.exports.deletByProperty=deletByProperty
