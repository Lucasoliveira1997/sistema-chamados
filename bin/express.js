'use strict'

const express = require('express')
const app = express()
const body_parser = require('body-parser')
const mongoose = require('mongoose')
const variables = require('../bin/configuration/variables')

const userRouter = require('../routes/user.router')
const ticketRouter = require('../routes/ticket.router')

app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: false}))

mongoose.connect(variables.database.connection, variables.database.options)
mongoose.set('useCreateIndex', true)

    mongoose.connection.on('connected', () => console.log(`Database Connected`))
    mongoose.connection.on('disconnected', () => console.log(`Database Diconnected`))
    mongoose.connection.on('failed', () => console.log(`The connection to database Failed`))

//routes
app.use('/api/users', userRouter)
app.use('/api/tickets', ticketRouter)

module.exports = app