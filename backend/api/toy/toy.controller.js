const express = require('express')
const toyService = require('./toy.service')
const logger = require('../../services/logger.service')


const router = express.Router()

// List Of toys

async function getToys(req, res) {
  try {
    const filterBy = req.query
    const toys = await toyService.query()
    res.send(toys)
  } catch (err) {
    logger.error('Failed to get toys', err)
    res.status(500).send({ err: 'Failed to get toys' })
  }
}

// router.get('/', (req, res) => {
//   const filterBy = req.query
//   console.log('filterBy-BACK', filterBy);
//   toyService.query(filterBy)
//     .then(toys => {
//       res.json(toys)
//     })
// })

// Get a single toy by id
async function getToy(req, res) {
  try {
    const toyId = req.params.id
    console.log('toyId controller', toyId);
    const toy = await toyService.getById(toyId)
    res.send(toy)
  } catch (err) {
    logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

// router.get('/:toyId', (req, res) => {
//   const toyId = req.params.toyId
//   toyService.getById(toyId)
//     .then(toy => {
//       res.json(toy)
//     })
// })
// Add toy
async function addToy(req, res) {
  try {
    const { name, price, type } = req.body
    const toy = { name, price, type }
    const savedToy = await toyService.add(toy)
    res.send(savedToy)
  } catch (err) {
    logger.error('Failed to save toy', err)
    res.status(500).send({ err: 'Failed to save toy' })
  }
}

// router.post('/', (req, res) => {
//   // console.log('req.body', req.body);
//   const { name, price, type } = req.body
//   const toy = { name, price, type }
//   toyService.save(toy)
//     .then((savedToy) => {
//       console.log('Added toy:', savedToy);
//       res.json(savedToy)
//     })
// })
// Update a toy
async function updateToy(req, res) {
  try {
    const { name, _id, price, type, inStock } = req.body
    console.log('req.body', req.body);
    const toy = { name, _id, price, type, inStock }
    const savedToy = await toyService.update(toy)
    res.send(savedToy)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })
  }
}

// router.put('/:toyId', (req, res) => {
//   const { name, _id, price, type, inStock } = req.body
//   const toy = { name, _id, price, type, inStock }
//   toyService.save(toy)
//     .then((savedToy) => {
//       console.log('Updated toy:', savedToy);
//       res.json(savedToy)
//     })
// })
// remove toy by id

async function deleteToy(req, res) {
  try {
    const toyId = req.params.id
    console.log('toyId delete', toyId);
    await toyService.remove(toyId)
    res.send({ msg: 'Deleted successfully' })
  } catch (err) {
    logger.error('Failed to delete toy', err)
    res.status(500).send({ err: 'Failed to delete toy' })
  }
}

// router.delete('/:toyId', (req, res) => {
//   const toyId = req.params.toyId
//   toyService.remove(toyId)
//     .then(() => {
//       res.json('Deleted...')
//     })
//     .catch((err) => {
//       console.log('Cannot remove toy', err)
//       res.status(401).send('Cannot remove toy')
//     })
// })

module.exports = {
  getToys,
  getToy,
  deleteToy,
  updateToy,
  addToy
}
