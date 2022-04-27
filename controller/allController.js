const express = require('express');
const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")

const createAuthor = async(req, res) => {
    let data = req.body
    let author = await authorModel.create(data)
    res.status(201).send({ status: true, Data: author })
}



const createBlogs = async function(req, res) {
    try {
        const data = req.body

        if (!data.title) {
            return res.status(400).send({ msg: "title is not given" })
        }
        if (!data.body) {
            return res.status(400).send({ msg: "body is not Given" })
        }
        if (!data.authorId) {
            return res.status(400).send({ msg: "authorId must be present" })
        }
        if (!data.category) {
            return res.status(400).send({ msg: "category must be present" })
        }
        const id = await authorModel.findById(data.authorId)
        if (!id) {
            return res.status(404).send({ status: false, msg: "invalied authorId" })
        }

        const Blog = await blogModel.create(data)
        return res.status(201).send({ status: true, msg: Blog })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}







module.exports.createAuthor = createAuthor

module.exports.createBlogs = createBlogs

//module.exports.blogId = blogId