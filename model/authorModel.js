const mongoose = required('mongoose');

const bookSchema = new mongoose.Schema( {
    firstName:String,
    LastName:String,
    title:{
        type:String,
        enum:["Mr","Mrs","Miss"],
        required:true
    },
    email:{
        require:true,
        type:String,
        unique:true
    },
    password:{
        require:true,
        type:String
    }
}, { timestamps: true });


module.exports = mongoose.model('Author', bookSchema) 