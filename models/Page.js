const mongoose = require("mongoose");

const PageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    tags: [String],         
    description:  String,
    dateCreated: {
        type: Date,
        default: Date.now          
    }
});

module.exports = mongoose.model('Page', PageSchema);