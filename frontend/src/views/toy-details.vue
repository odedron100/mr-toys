
<template>
  <section class="toy-details-container" v-if="toy">
    <div class="toy-details">
      <h3 class="details-item"><h4>name:</h4>{{toy.name}}</h3>
      <div class="details-item"><h3>price:</h3>{{toy.price}}</div>
      <div class="details-item"><h3>type:</h3>{{toy.type}}</div>
      <div class="details-item"><h3>create at:</h3>{{toy.createAt}}</div>
      <div class="details-item"><h3>in Stock:</h3>{{toy.inStock}}</div>
    </div>
    <div class="reviews">
      <ul class="review-list">
        <li v-for="review in reviews" :key="review._id">
          <h3>review</h3>
          <div class="review-items">
            <p>
              About
            </p>
            <h3>{{review.txt}}</h3>
            <p>By
              {{review.user.fullname}}
            </p>
          </div>
        </li>
      </ul>
      <form @submit.prevent="addReview()">
        <h2>Your gossip:</h2>
        <textarea placeholder="Your Opinion Matters..." v-model="reviewToEdit.txt"></textarea>
        <button>Save</button>
      </form>
    </div>
    <router-link to="/toy">Back</router-link>
  </section>
</template>
<script>
    import { toyService } from '../services/toy-service.js'
  export default {
    data() {
      return {
        toy: null,
         reviewToEdit: {
          txt: '',
          aboutToyId: null
        },
        reviewsToShow:null
      }
    },
     computed: {
      reviews() {
        return this.$store.getters.reviews;
      },
      users() {
        return this.$store.getters.users
      },
      loggedInUser() {
        return this.$store.getters.loggedinUser
      }
    },
    created() {
      this.$store.dispatch({type: 'loadUsers'})
      const toyId = this.$route.params.toyId
      this.$store.dispatch({type: 'loadReviews',filterBy:{aboutToyId:toyId}})
      toyService.getById(toyId)
      .then(newToy=>{
        this.toy = newToy
        this.reviewToEdit.aboutToyId = newToy._id
      })
    },
    methods: {
       async addReview() {
        await this.$store.dispatch({type: 'addReview', review: this.reviewToEdit})
        this.reviewToEdit = {txt: '', aboutToyId: null}
      }
    },
    components: {
    }
  }
</script>
