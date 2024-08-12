const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const route = require('./routes/route')
const cors = require('cors')

const app = express()
app.use(bodyparser.json())
dotenv.config()
app.use(cors())

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_UR

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('db connected');

    })
    .catch((error) => console.log('error', error))

app.use('/api', route)

app.listen(PORT, () => {
    console.log(`server connected port ${PORT}`);

})