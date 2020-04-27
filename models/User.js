const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        max: 18
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
      
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6.
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    credits: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: "Freemium",
    },
    accounts: []
})
module.exports = mongoose.model('User', UserSchema)