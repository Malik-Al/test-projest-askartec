const express = require('express')
const mongoose = require('mongoose')
const router = require('./router')
const PORT = process.env.PORT || 5000
const url = 'mongodb+srv://malik:malik123456789@cluster0.reryk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()
app.use(express.json())
app.use('/auth', router)


const start = async () => {
    try {
        await mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        app.listen(PORT, () => console.log(`server started on port ${PORT}...`))
    } catch (e){
        console.log(e)
    }
}
start()
