const express = require('express');
const { default: mongoose } = require('mongoose');
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
        if(!( ["Mr", "Mrs", "Miss"].includes(data.title))) return res.status(400).send({status: false,msg:"plz write valid title"})
        
        // email validation
        if(!data.email)  return res.status(400).send({ status:false, msg: "email must be present" });
        let y = data.email
        let regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z])+\.([a-z]+)(.[a-z])?$/
        let x = y.match(regx)
        if(!x) return res.send({status:false,msg:"write the correct format for email"})
         let mail = await authorModel.findOne({email:y})
         console.log(mail)
         if(mail) return res.status(400).send({status: false,msg:"this email is already present"})

        // password validation
        if(!data.password)  return res.status(400).send({ status:false, msg: "plz write the password" });
        if(typeof data.firstName !== "string") return res.status(400).send({ status:false, msg: "title should be string" });

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
    { let fil = req.query
        authorId = fil.authorId
        category = fil.category
        tags=fil.tags
        subcategory=fil.subcategory

         let keys = Object.keys(fil)
         console.log(keys)
         console.log(authorId in keys)
         if( authorId){
        let idCheck = mongoose.isValidObjectId(authorId)
        if(!idCheck) return res.status(400).send({ status:false, msg: "authorId is not a type of objectId" })
        }
        
         if(!authorId &&!tags&& !category && !subcategory) return res.send("not filter")

        let data = await blogModel.find({$and:[{isDeleted:false} , {isPublished:true},fil]})      
        if(data.length === 0) return res.status(404).send({status:false , msg:"Blogs not found"})
        res.status(200).send({status: true ,Data :data})
        }

        
    
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: "error", error: err.message })
    }
}



const updateblogs = async function(req,res){

   
     try{
        let blogId = req.params.blogId;
        console.log(blogId)
        let idCheck = mongoose.isValidObjectId(blogId)
        console.log(idCheck)
        if(!idCheck) return res.status(400).send({ status:false, msg: "blogId is not a type of objectId" })
        
        const title = req.body.title;
        const body = req.body.body;
        const tags = req.body.tags;
        const subcategory = req.body.subcategory;
        const isPublished = req.body.isPublished;

        let exist = await blogModel.findById(blogId)
        if(!exist) return  res.status(404).send({ status:false, msg: "blog in not present" })

        if(exist.isDeleted ===true) return  res.status(404).send({ status:false, msg: "already deleted" })
    
        if(title||body||tags||subcategory){
        
    const updateblogs = await blogModel.findByIdAndUpdate(  blogId ,{$addToSet:{tags:tags,subcategory:subcategory},
        $set : { title: title, body: body}},
        { new: true });
        console.log(updateblogs.isPublished)

        if (updateblogs.isPublished === true) {
            console.log("hello")
            updateblogs["pulbishedAt"] = Date.now()
        }

        return res.status(200).send({ status: true,data:updateblogs ,msg: "successfully Update blog details"});
    }
    else return res.status(404).send({ status:false, msg: "not valid" })
    }  
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: "error", error: err.message })
    } 


    }

    const deletById=async (req,res)=>{
        try{
            let data=req.params.Id
            
            console.log(data)
            let idCheck = mongoose.isValidObjectId(data)
            console.log(idCheck)
            if(!idCheck) return res.status(400).send({ status:false, msg: "authorId is not a type of objectId" })
            
             let status= await blogModel.findById(data)
             if(!status) return res.status(404).send({msg :"data is not present"})
             let prop= status.isDeleted

             if(prop) return res.status(404).send({msg :"Already dealeted"}) 

             if(mongoose.Types.ObjectId.isValid(data) && !prop ) 
             {
            let delteblog=await blogModel.findByIdAndUpdate(data,{$set:{isDeleted:true,deleteAt: Date.now()}},{new:true})
            res.status(200).send(" ")
             }
             
           
        }    
        catch (err) {
            console.log(err.message)
            res.status(500).send({ status: "error", error: err.message })
        }
    }
    const deletByProperty=async (req,res)=>
    {
        try{
            let data = req.query
            let category = data.category
            let tags = data.tags
            let authorId= data.authorId
            let subcategory= data.subcategory


            console.log(data)
            if(data ===undefined||Object.keys(data).length===0) return res.status(400).send({status: false,msg :"plz enter the data"})
            
            if(!authorId &&!tags&& !category && !subcategory) return res.status(404).send({msg:"not a valid  filter"})

            let exist = await blogModel.find(data)
            console.log(exist)
            
            if(exist.length===0) return res.status(404).send({msg :"blog is not present in db"})

            let x = exist.filter(y => y.isDeleted == false)
            
            console.log("in x not deleted",x)
            

            if(x.length ===0)  return res.send("already deleted")

            let property=await blogModel.updateMany( data ,{$set:{isDeleted:true,deleteAt: Date.now()}},{new:true})

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
