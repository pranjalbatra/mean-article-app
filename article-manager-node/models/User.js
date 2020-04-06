const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Article = require('../models/Article')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email address')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    password: {
        type: String,
    }
})


userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

/*
 * Search for a user by email and password.
 */
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error('Invalid login credentials')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Incorrect Password')
    }
    return user
}

/*
 * CREATE, READ AND UPDATE ARTICLES 
 */

userSchema.statics.myArticles = async function(user_id,action,data){
    switch(action){
        case 'create':
            delete data._id;
            data.creator_id = user_id;
            let article = new Article(data)
            await article.save()
            return article;
            break;
        case 'read':
            let articles = await Article.find({creator_id:user_id}).sort('-publish_date');
            return articles;
            break;
        case 'update':
            let articl = await Article.findOne({_id:data._id})
            articl.image_link = data.image_link;
            articl.title = data.title;
            articl.description = data.description;
            await articl.save()
            return articl;
            break;
        default:
    }
}

/*
 * FETCH ALL ARTICLES 
 */

userSchema.statics.getAllArticles = async function(){
    let results = await Article.find().sort('-publish_date');
    return results;
}

/*
 * FETCH SINGLE ARTICLE
 */

userSchema.statics.getArticleById = async function(id){
    let result = await Article.findOne({_id:id});
    return result;
}

const User = mongoose.model('User', userSchema)

module.exports = User