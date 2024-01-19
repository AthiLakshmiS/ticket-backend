const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    phone : {
        type : String,
    },
    description : {
        type : String,
    },
    active : {
        type : Boolean,
    },
    dateCreated : {
        type : Date,
    }
})

const User = mongoose.model('user', UserSchema)

module.exports = User