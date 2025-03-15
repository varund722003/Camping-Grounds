const mongoose  = require ('mongoose');
const { campgroundSchema } = require('../schemas');
const { ref } = require('joi');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author : {  
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Review", reviewSchema);

