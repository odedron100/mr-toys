
<template>
  <section class="toy-details" v-if="toy">
    <h3 class="details-item"><h4>name:</h4>{{toy.name}}</h3>
    <div class="details-item"><h3>price:</h3>{{toy.price}}</div>
    <div class="details-item"><h3>type:</h3>{{toy.type}}</div>
    <div class="details-item"><h3>type:</h3>{{toy.type}}</div>
    <div class="details-item"><h3>create at:</h3>{{toy.createAt}}</div>
    <div class="details-item"><h3>in Stock:</h3>{{toy.inStock}}</div>
    <router-link to="/toy">Back</router-link>
  </section>
</template>
<script>
    import { toyService } from '../services/toy-service.js'
  export default {
    data() {
      return {
        toy: null,
      }
    },
    computed: {
    },
    created() {
      const toyId = this.$route.params.toyId
      toyService.getById(toyId)
      .then(newToy=>
        this.toy = newToy
      )
    },
    methods: {
    },
    components: {
    }
  }
</script>
