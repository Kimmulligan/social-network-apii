const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const thoughtRouter = require('./thought')
router.use('/user', userRouter)
router.use('/thoughts', thoughtRouter)

module.exports = router