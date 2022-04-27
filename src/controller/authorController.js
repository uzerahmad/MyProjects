const express = require('express');
const { default: mongoose } = require('mongoose');
const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")
 


const createAuthor = async(req, res) => {
     try{
         let data = req.body
        //  data validation
        
        if(Object.keys(data).length===0) return res.status(400).send({ status:false, msg: "plz ener some data" })

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
         if(!mail) return res.status(400).send({status: false,msg:"this email is already present"})

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





module.exports.createAuthor = createAuthor

