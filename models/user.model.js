'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, trim: true, required: true, min: 1, max: 100, index: true},
    email: {type: String, trim: true, required: true, unique: true, lowercase: true, index: true},
    password: {type: String, trim: true, required: true, select: false, index: true},
    department: {type: String, trim: true, required: true, min: 1, max: 100, index: true},
    phone: {type: String, trim: true, required: true, index: true},
    status: {type: Boolean, trim: true, required: true, index: true},
    category: {type: String, trim: true, required: true, min: 1, max: 100, index: true},
    createAt: {type: Date, default: Date.now}
}, {versionKey: false}) 

userSchema.pre('save', next => {
    let now = new Date

    if(!this.createAt){
        this.createAt = now
    }
    next()
})

module.exports = mongoose.model('user', userSchema)