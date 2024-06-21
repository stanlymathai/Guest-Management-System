const express = require("express")
const router = express.Router()
const verifyAccessScheduler = require('../../common/helper').verifyAccessScheduler
const queueController = require('../contoller/queueController')

router.get("/sendmail", verifyAccessScheduler, queueController.sendmail)

module.exports = router