const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const articleSchema = mongoose.Schema({
    title: {
        type: String,
        maxLength:50
    },
    description:{
        type:String,
        maxLength:2000
    },
    image_link:{
        type:String
    },
    publish_date:{type:Date,default:Date.now},
    creator_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
})


const Article = mongoose.model('Article', articleSchema)

module.exports = Article