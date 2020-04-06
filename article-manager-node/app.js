require('dotenv').config();
const express = require('express')
const userRouter = require('./routers/user')
var cors = require('cors');
const port = process.env.PORT || 5000
require('./db/db')

const app = express()
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.use(express.json())
app.use(userRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})