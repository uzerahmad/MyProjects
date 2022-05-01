



const jwt = require("jsonwebtoken");
const authorModel = require("../model/authorModel");




const loginUser = async function (req, res) {
    try{
      let userName = req.body.email.trim().toLowerCase();
      let password = req.body.password.trim();
      if(!userName) {
        return res.status(400).send({msg:"email can not be empty"})
      }
      if(!password) {
        return res.status(400).send({msg:"password can not be empty"})
      }
      let user = await authorModel.findOne({ email: userName, password: password });
      if (!user)
        return res.status(404).send({status: false, msg: "Please enter a valid email address and password"});
   
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
  