const mongoose = require('mongoose')

function connectMongoose (uri) {
    mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then( () => {
            console.log('Connected to db',uri)
        })
        .catch( err => {
            console.log(err)
        })
}

module.exports = {
    connectMongoose
}