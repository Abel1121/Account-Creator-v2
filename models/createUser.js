const mongoose = require('mongoose');
const createUserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    coins: {
        type: Number,
        default: 0,
    },
})