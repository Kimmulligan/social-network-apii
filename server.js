const User = require('./Models/User')
const Thought = require('./Models/Thought')
const db = require('./connection')
const express = require('express')
const server = express()
const allRoutes = require('./routes')
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(allRoutes)
server.listen(3000, () => {
console.log("Server started.");
})

