const express = require('express')
const { getToys, getToy, deleteToy, updateToy, addToy } = require('./toy.controller')

const router = express.Router()

router.get('/', getToys)
router.get('/:id', getToy)
router.delete('/:id', deleteToy)
router.put('/:id', updateToy)
router.post('/', addToy)

module.exports = router
