const express = require('express');
const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")

const createAuthor = async(req, res) => {
    let data = req.body

    if(!data.firstName)  return res.status(400).send({ status:false, msg: "firstName must be present" });
    if(!data.lastName)  return res.status(400).send({ status:false, msg: "Last name must be present" });
    if(!data.title)  return res.status(400).send({ status:false, msg: "title must be present" });
    if(!data.email)  return res.status(400).send({ status:false, msg: "title must be present" });

    if(!data.password)  return res.status(400).send({ status:false, msg: "plz write the password" });
    let y = data.email
     let regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z])+\.([a-z]+)(.[a-z])?$/
     let x = y.match(regx)

     if(!x) return res.send({status:false,msg:"write the correct format for email"})

    let author = await authorModel.create(data)
    res.status(201).send({ status: true, Data: author })
}



const createBlogs = async function(req, res) {
    try {
        const data = req.body

        if (!data.title) {
            return res.status(400).send({ status:false, msg: "title is not given" })
        }
        if (!data.body) {
            return res.status(400).send({status:false, msg: "body is not Given" })
        }
        if (!data.authorId) {
            return res.status(400).send({ status:false,msg: "authorId must be present" })
        }
        if (!data.category) {
            return res.status(400).send({status:false, msg: "category must be present" })
        }
        const id = await authorModel.findById(data.authorId)
        if (!id) {
            return res.status(404).send({ status: false, msg: "invalied authorId" })
        }

        const Blog = await blogModel.create(data)
        return res.status(201).send({ status: true, msg: Blog })
    } catch (err) {
        res.status(500).send({ status: error, error: err.message })
    }
}

const getBlogs = async function(req,res){
    try
    { let filter = req.query
        let data = await blogModel.find({isDeleted:false , isPublished:true},filter).populate("authorId")
        
        if(data.length === 0) return res.status(404).send({status:false , msg:"Blogs not found"})
        res.status(200).send({status: true ,Data :data})

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: error, error: err.message })
    }
}

// const getfilter = async (req,res)=>{
//      let data = req.query
//      let filter =  await blogModel.find(data)
//      res.send({data:filter})
//     }

const updateblogs = async (req,res)=>{
    
}



module.exports.createAuthor = createAuthor

module.exports.createBlogs = createBlogs
module.exports.getBlogs=getBlogs
module.exports.updateblogs=updateblogs
// module.exports.getfilter=getfilter

//module.exports.blogId = blogId