const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        // const criteria = _buildCriteria(filterBy)
        //

        console.log('filterBy', filterBy);
        // if (filterBy.toyId) {
        //     filterBy.toyId = (filterBy.toyId)
        //     reviewToShow = { toyId: filterBy.toyId }
        // }
        // if (filterBy.userId) {
        //     filterBy.userId = (filterBy.userId)
        //     reviewToShow = { byUserId: filterBy.userId }
        // }
        filterBy.aboutToyId = ObjectId(filterBy.aboutToyId)
        const collection = await dbService.getCollection('review')
        var reviews = await collection.aggregate([
            {
                $match: filterBy
            },
            {
                $lookup:
                {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup:
                {
                    localField: 'aboutToyId',
                    from: 'toy',
                    foreignField: '_id',
                    as: 'toy'
                }
            },
            {
                $unwind: '$toy'
            }
        ]).toArray()
        console.log('the reviews', reviews)
        reviews = reviews.map(review => {
            review.user = { _id: review.user._id, fullname: review.user.fullname }
            review.toy = { _id: review.toy._id, name: review.toy.name, price: review.toy.price }
            delete review.aboutToyId
            delete review.byUserId
            return review
        })
        return reviews
    } catch (err) {
    logger.error('cannot find reviews', err)
    throw err
    }
}

// async function getReviewsById(id) {
//     try {
//         const collection = await dbService.getCollection('review')
//         const reviews = await collection.findOne({ 'aboutToyId._id': id })
//         return reviews
//     } catch (err) {
//         logger.error(`while finding toy ${toyId}`, err)
//         throw err
//     }

// }

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const query = { _id: ObjectId(reviewId) }
        if (!isAdmin) query.byUserId = ObjectId(userId)
        await collection.deleteOne(query)
        // return await collection.deleteOne({ _id: ObjectId(reviewId), byUserId: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    try {
        // peek only updatable fields!
        const reviewToAdd = {
            byUserId: ObjectId(review.byUserId),
            aboutToyId: ObjectId(review.aboutToyId),
            txt: review.txt
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd;
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    remove,
    add
}
