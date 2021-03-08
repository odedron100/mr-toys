
<template>
  <section class="toy" @click="onToyClicked(toy._id)" >
    <h3 class="item"><h4>name:</h4>{{toy.name}}</h3>
    <div class="item"><h3>price:</h3>{{toy.price}}</div>
    <div class="item"><h3>in stock:</h3>{{toy.inStock}}</div>
  </section>
</template>
<script>
  export default {
    props:{
      toy:Object
    },
    methods: {
      onToyClicked(toyId) {
          this.$emit('onToyClicked', toyId);
      }

    }
  }
</script>
