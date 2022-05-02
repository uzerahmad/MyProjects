const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema({
    fname: {type:String,
        required:true},
    lname: {type:String,
        required:true},
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required: true
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
    password: {
        require: true,
        type: String
    }
}, { timestamps: true });


module.exports = mongoose.model('Author', authorSchema)