import { httpService } from './http.service.js'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

export const reviewService = {
  add,
  query,
  remove
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(filterBy) {
  console.log('filterBy', filterBy);
  // var queryStr = utilService.formatFilter(filterBy);
  // console.log('queryStr', queryStr);
  return httpService.get('review', filterBy, true)
  // return storageService.query('review')
}

function remove(reviewId) {
  return httpService.delete(`review/${reviewId}`)
  // return storageService.delete('review', reviewId)

}
async function add(review) {
  console.log('review-service-front', review);
  const addedReview = await httpService.post('review', review)
  console.log('addedReview-after-service-front', addedReview);

  // review.byUser = userService.getLoggedinUser()
  // review.aboutUser = await userService.getById(review.aboutUserId)
  // const addedReview = storageService.post('review', review)

  return addedReview
}
