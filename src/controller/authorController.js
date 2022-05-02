
const authorModel = require("../model/authorModel")

 


const createAuthor = async (req, res) => {
     try{
         let data = req.body
        //  data validation

        let {fname,lname,title, email,password} = data
        
        if(Object.keys(data).length===0) return res.status(400).send({ status:false, msg: "plz enter some data" })

        // Fname validation
        if(!fname)  return res.status(400).send({ status:false, msg: "fname must be present" });
        if(typeof fname !== "string") return res.status(400).send({ status:false, msg: "fname should be string" });
        data.fname = data.fname.trim()

        // lname validation
        if(!lname)  return res.status(400).send({ status:false, msg: "Last name must be present" });
        if(typeof lname !== "string") return res.status(400).send({ status:false, msg: "Lname should be string" });
        data.lname=data.lname.trim()

        // title validation
        if(!title)  return res.status(400).send({ status:false, msg: "title must be present" });
        if(typeof title !== "string") return res.status(400).send({ status:false, msg: "title should be string" });
        if(!( ["Mr", "Mrs", "Miss"].includes(data.title))) return res.status(400).send({status: false,msg:"plz write valid title"})
        
        // email validation
        if(!email) { 
            return res.status(400).send({ status:false, msg: "email must be present" });
        }
        let regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z])+\.([a-z]+)(.[a-z])?$/

        let x = email.match(regx)
        if(!x) {
            return res.status(400).send({status:false,msg:"write the correct format for email"})
        }
         let mail = await authorModel.findOne({email: email.toLowerCase()})

         if(mail) return res.status(400).send({status: false,msg:"this email is already present"})
         data.email = data.email.toLowerCase()

        // password validation
        if(!password)  return res.status(400).send({ status:false, msg: "plz write the password" });
        if(typeof password !== "string") return res.status(400).send({ status:false, msg: "Password should be string" });
        data.password= data.password.trim()

        let author = await authorModel.create(data)
        res.status(201).send({ status: true, Data: author })
    }
    catch(err){
        res.status(500).send({status: "error" , msg: err.message})
    }
}




module.exports.createAuthor = createAuthor


