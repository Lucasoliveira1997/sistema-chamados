'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId

const ticketSchema = new Schema({    
    user: {type: objectId, required: true, trim: true, index: true},
    about: {type: String,required: true, trim: true, index: true},
    description: {type: String, required: true, min: 1, max: 500, trim: true, index: true},
    createAt: {type: Date, default: Date.now, trim: true, index: true}
}, {versionKey: false}) 

ticketSchema.pre('save', next => {
    let now = new Date

    if(!this.createAt){
        this.createAt = now
    }
    next()
})

module.exports = mongoose.model('ticket', ticketSchema)