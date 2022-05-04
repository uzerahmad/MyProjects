
const authorModel = require("../model/authorModel")

const createAuthor = async (req, res) => {
    try{
         let data = req.body
        //  data validation

        let {fname,lname,title, email,password} = data
        
        
        if(Object.keys(data).length===0) return res.status(400).send({ status:false, msg: "plz enter some data" })

        // Fname validation
        console.log(typeof fname)
        if(!fname)  return res.status(400).send({ status:false, msg: "first name must be present" });
        // if(typeof fname !== "string"||fname.trim().length ===0) return res.status(400).send({ status:false, msg: "fname should be string" });
        // data.fname = data.fname.trim()
        let name =/^[a-zA-z]{2,30}$/.test(fname)
        if(!name) return res.status(400).send({status:false,msg:"enter valid first name "})

        

        // lname validation
        if(!lname)  return res.status(400).send({ status:false, msg: "Last name must be present" });
        // if(typeof lname !== "string"||lname.trim().length ===0) return res.status(400).send({ status:false, msg: "Lname should be string" });
        // data.lname=data.lname.trim()
        let lame =/^[a-zA-z]{2,30}$/.test(lname)
        if(!name) return res.status(400).send({status:false,msg:"enter valid first name "})

        // title validation
        if(!title)  return res.status(400).send({ status:false, msg: "title must be present" });
        if(typeof title !== "string") return res.status(400).send({ status:false, msg: "title should be string" });
        if(!( ["Mr", "Mrs", "Miss"].includes(data.title))) return res.status(400).send({status: false,msg:"plz write valid title"})
        
        // email validation
        if(!email) { 
            return res.status(400).send({ status:false, msg: "email must be present" });
        }
        
        let regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z])+\.([a-z]+)(.[a-z])?$/
        // rege=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let x = regx.test(email)
        if(!x) {
            return res.status(400).send({status:false,msg:"write the correct format for email"})
        }
         let mail = await authorModel.findOne({email: email.toLowerCase()})

         if(mail) return res.status(400).send({status: false,msg:"this email is already present"})
         data.email = data.email.toLowerCase()

        // password validation
        if(!password)  return res.status(400).send({ status:false, msg: "plz write the password" });
        if(typeof password !== "string"||password.trim().length ===0) return res.status(400).send({ status:false, msg: "enter valid password" });
        data.password= data.password.trim()
        
        let author = await authorModel.create(data)

        res.status(201).send({ status: true, data: author })
    }
    catch(err){
        res.status(500).send({status: "error" , msg: err.message})
    }
}

module.exports.createAuthor = createAuthor


