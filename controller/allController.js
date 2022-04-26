const express = require('express');
const authorModel = require("../model/authorModel")

const createAuthor = async (req,res)=>{
    let data = req.body
    let author = await authorModel.create(data)
    res.status(201).send({status:true , Data: author})
}
module.exports.createAuthor = createAuthor