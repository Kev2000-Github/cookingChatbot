const config = require('../config')
const mongoose = require('mongoose')
const MONGODB_URI=config.MONGODB_URI

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(async db => {
    console.log('Database is connected')
})
.catch(err => console.log(err))
