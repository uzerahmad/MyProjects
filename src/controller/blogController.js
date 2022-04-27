const express = require('express');
const { default: mongoose } = require('mongoose');
const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")
 





const createBlogs = async function(req, res) {
    try {
        const data = req.body
        //  data validation
        
        if(Object.keys(data).length===0) return res.status(400).send({ status:false, msg: "plz ener some data" })
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
            return res.status(404).send({ status: false, msg: "invalied authorId" })
        }

        if (!data.category) {
            return res.status(400).send({status:false, msg: "category must be present" })
        }
        
        const Blog = await blogModel.create(data)
        return res.status(201).send({ status: true, msg: Blog })
    } 
    catch (err) {
        res.status(500).send({ status: "error", error: err.message })
    }
}

module.exports.createBlogs = createBlogs
