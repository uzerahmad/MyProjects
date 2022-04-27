const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    body: {
        required: true,
        type: String
    },
    authorId: {
        required: true,
        type: ObjectId,
        ref: 'Author'
    },
    tags: {
        type: [String],
    },
    category: {
        type: [String],
        require: true
       
    },
    subcategory: {
        type: [String]
    },

    deleteAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false

    },
    pulbishedAt: {
        type: Date,
        default: null
    },

    isPublished: {
        type: Boolean,
        default: false

    }


}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)