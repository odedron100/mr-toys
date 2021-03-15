const logger = require('../../services/logger.service')
// const userService = require('../user/user.service')
const toyService = require('../toy/toy.service.js')
const reviewService = require('./review.service.js')

async function getReviews(req, res) {
    try {
        const reviews = await reviewService.query(req.query)
        console.log('reviews:', reviews)
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

// async function getReviewsById(req, res) {
//     try {
//         const reviews = await reviewService.queryById(req.query)
//         res.send(reviews)
//     } catch (err) {
//         logger.error('Cannot get reviews', err)
//         res.status(500).send({ err: 'Failed to get reviews' })
//     }
// }

async function deleteReview(req, res) {
    try {
        await reviewService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete review', err)
        res.status(500).send({ err: 'Failed to delete review' })
    }
}



async function addReview(req, res) {
    try {
        console.log('req review controller', req);
        var review = req.body
        review.byUserId = req.session.user._id
        review = await reviewService.add(review)
        console.log('review-controller-bac1', review);
        console.log('review-controller-bac2', review);
        res.send(review)

    } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getReviews,
    deleteReview,
    addReview,
    // getReviewsById
}
