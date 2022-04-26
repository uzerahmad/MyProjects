const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    tiltle: {
        required: true,
        type: String
    },
    body: {
        required: true,
        type: Sting
    },
    authroId: {
        required: true,
        type: ObjectId,
        ref: 'Author'
    },
    tags: {
        type: [String],
    },
    category: {
        type: [String],
        require: true,
        enum: ["technology", "entertainment", "life style", "food", "fashion"]
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
    pulbishedAt: Date,

    isPublished: {
        type: Boolean,
        default: false

    }


}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)