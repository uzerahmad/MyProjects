



const { required } = require("nodemon/lib/config");


const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const authorModel = require("../model/authorModel");




const loginUser = async function (req, res) {
    try{
      let userName = req.body.email;
      let password = req.body.password;
      if(!(userName && password)){
        return res.status(400).send({msg:"email and passward can not be empty"})
      }
      let user = await authorModel.findOne({ email: userName, password: password });
      if (!user)
        return res.status(404).send({status: false, msg: "UserName or the password is not corerct"});
   
      let token = jwt.sign(
        {
          authorId: user._id.toString(),
          group :"12",
          project:1,
        },
        "project-1-group-12"
      );
      res.setHeader("x-api-key", token);
      res.status(200).send({ status: true, data: token });
    }
    catch(err){
      console.log(err.message)
       res.status(500).send({status:"error",msg:err.message})
    }
  }

module.exports.loginUser=loginUser
  