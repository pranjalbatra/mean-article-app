const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = express.Router()

const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './public/images' });

const  app  =  express()
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


router.post('/users/signup', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        console.log(error)
        const errorResponse = {
            error:
            error != null
            ? (error.stack != undefined ? error.stack.split('\n') : error) || error
            : 'Solvable Error'
            };
        res.status(400).send({errorResponse})
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        console.log(error)
        const errorResponse = {
            error:
            error != null
            ? (error.stack != undefined ? error.stack.split('\n') : error) || error
            : 'Solvable Error'
            };
        res.status(400).send({errorResponse})
    }

})


/**
 * GET ALL ARTICLES
 */

router.post('/getAllArticles',async(req,res) => {
    try {
        let results = await User.getAllArticles()
        res.send({results})
    } catch (error) {
        console.log(error)
        const errorResponse = {
            error:
            error != null
            ? (error.stack != undefined ? error.stack.split('\n') : error) || error
            : 'Solvable Error'
            };
        res.status(400).send({errorResponse})
    }
})

/**
 * GET ARTICLE By ID
 */

router.post('/getArticleById',async(req,res) => {
    try {
        let data = req.body;
        let result = await User.getArticleById(data._id)
        res.send(result)
    } catch (error) {
        console.log(error)
        const errorResponse = {
            error:
            error != null
            ? (error.stack != undefined ? error.stack.split('\n') : error) || error
            : 'Solvable Error'
            };
        res.status(400).send({errorResponse})
    }
})

/**
 * USER Articles
 */

router.post('/users/myArticles/:action',auth,async(req,res) => {
    try {
        let data = req.body;
        let action = req.params.action;
        let result = await User.myArticles(req.user._id,action,data)
        res.send(result)
    } catch (error) {
        console.log(error)
        const errorResponse = {
            error:
            error != null
            ? (error.stack != undefined ? error.stack.split('\n') : error) || error
            : 'Solvable Error'
            };
        res.status(400).send({errorResponse})
    }
})


/**
 * LOGOUT USER
*/


router.post('/users/logout', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        console.log(error)
        const errorResponse = {
            error:
            error != null
            ? (error.stack != undefined ? error.stack.split('\n') : error) || error
            : 'Solvable Error'
            };
        res.status(400).send({errorResponse})
    }
})


/*
* FILE UPLOAD
*/

router.post('/users/imgUpload', multipartMiddleware, (req, res) => {
    let fn = req.protocol+'://'+req.get('host')+'/'+req.files.uploads[0].path;
    fn = fn.replace("/public", "");
    res.send({'filename':fn});
});


module.exports = router