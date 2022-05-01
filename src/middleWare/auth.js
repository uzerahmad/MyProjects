
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose")



const validateToken = async function (req, res, next) {
    try {
        let token = req.headers['x-Api-Key'] || req.headers['x-api-key']
        if (!token) {
           return res.status(404).send({ status: false, msg: "token must be present" });
        }

        let decodedToken = jwt.verify(token, "project-1-group-12")
         console.log(decodedToken)

        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "token is invalid" });

        }
        req["authorId"]= decodedToken.authorId
        console.log(req["authorId"])
        
        next();
    } catch (err) {
        return res.status(500).send({  status:"Error", error: err.message })

    }
}
module.exports.validateToken = validateToken
