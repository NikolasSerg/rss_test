const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

const cors = require('cors')
const router = require('./router/index')
const cookieParser = require("cookie-parser");
const errorMiddleware = require('./middleware/error.middleware')

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URI
}))
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

const start = () => {

    try {
        mongoose.set('strictQuery', false)
        mongoose
            .connect(
                process.env.MONGODB_URI,
                { useNewUrlParser: true, useUnifiedTopology: true }
            )
            .then(() => console.log('MongoDB Connected'))
            .catch(err => console.log(err));
        app.listen(PORT, () => console.log(`server started on ${PORT}`))
    } catch (e) {
        console.error(e, ' - ERROR connection')
    }
}

start()