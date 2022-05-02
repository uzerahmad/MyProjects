
const mongoose = require('mongoose');
const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")
 




const createBlogs = async function(req, res) {
    try {
        const data = req.body
        //  data validation
        
        if(Object.keys(data).length===0) return res.status(400).send({ status:false, msg: "plz enter some data" })

        let {authorId,title,body ,category,tags,subcategory,isPublished, isDeleted}= data

         // authorId validation
         
         if (!authorId) {
             return res.status(400).send({ status:false,msg: "authorId must be present" })
         }
         
         let idCheck =mongoose.isValidObjectId(authorId)
         if(!idCheck) return res.status(400).send({ status:false, msg: "authorId is not a type of objectId" })
 
         const id = await authorModel.findById(authorId)
         if (!id) {
             return res.status(404).send({ status: false, msg: "this Author is not present." })
         }
        //  accessing the payload authorId from request
         let token = req["authorId"]  

        //  authorization
         if(token!=authorId)
         {
            return res.status(403).send({status:false,msg:"You are not authorized to access this data"})
         }
         console.log(title)
 
        // title validation
        if (!title||title===undefined) {
            return res.status(400).send({ status:false, msg: "title is not given" })
        }
        if(typeof title !== "string") return res.status(400)
        .send({ status:false, msg: "title should be string" });
        
        data.title = data.title.trim()

        // body validation
        if (!body) {
            return res.status(400).send({status:false, msg: "body is not Given" })
        }
        if(typeof body !== "string") return res.status(400)
        .send({ status:false, msg: "body should be string" });
        data.body =data.body.trim()

        // category validation
        if (!category) {
            return res.status(400).send({status:false, msg: "category must be present" })
        }
        if(typeof category !== "string") return res.send({status:false,msg:"category must be  string"})
        data.category =data.category.trim()
        

        // if(category.every(x =>(typeof x !== 'string'))) return res.send("category shold be string")
        // if isPublished key is present
        if(isPublished){
            if(typeof isPublished!=="boolean"){
                return res.status(400)
                .send({status: false,msg:"isPublished is boolean so,it can be either true or false"})
            }if(isPublished ===true)
            data.publishedAt =Date.now()
        }
        
        // if isdeleted key is present
        if(isDeleted){
            if(typeof isDeleted!=="boolean"){
                return res.status(400)
                .send({status: false,msg:"isDeleted is boolean so,it can be either true or false"})
            }
            if(isDeleted ===true){data.deletedAt =Date.now()}
        }

        
        // tags validation
        if(tags){
            if(!Array.isArray(tags)) return res.send("tags is not array")  
        }

        // subcategory validation

        if(subcategory){
            if(!Array.isArray(subcategory))return res.status(400)
            .send({status: false,msg:"subcategory should be array of strings"})
        }

       
        
        // Blog Creation
        const Blog = await blogModel.create(data)
        return res.status(201).send({ status: true, data: Blog })
    }
     catch (err) {
        res.status(500).send({ status: "error", error: err.message})
    }
}



module.exports.createBlogs = createBlogs
