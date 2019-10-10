'use strict'

const express = require('express')
const router = express.Router()
const Controller = require('../controllers/user.controller')

let _ctrl = new Controller()

router.post('/', _ctrl.post)
router.get('/', _ctrl.get)
router.get('/:id', _ctrl.getById)
router.put('/:id', _ctrl.put)
router.delete('/:id', _ctrl.delete)

module.exports = router