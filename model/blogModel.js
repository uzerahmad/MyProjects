const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema( {
    tiltle:{
        required:true,
        type:String    
    },
    body:{
        required:String,
        type:Sting
    },
    authroId:{
        required:true,
        type:ObjectId,
        ref:'Author'     
    },
    tags:{
        type:[String],
    },
    category:{
        type:[String],
        require:true
    },
    subcategory:{
        type:[String]
    },

    deleteAt:{
        timestamps:true
    },
    isDeleted:{
        type:Boolean,
        default:false

    },
    pulbishedAt:{
        type:String
       
    },
    isPublished:{
        type:Boolean,
        default:false

    }

  
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) 