const express = require('express')
const { getToys, getToy, deleteToy, updateToy, addToy } = require('./toy.controller')

const router = express.Router()

router.get('/', getToys)
router.put('/:_id/edit', updateToy)
router.get('/:_id', getToy)
router.delete('/:_id', deleteToy)
router.post('/', addToy)

module.exports = router
