
<template>
  <section class="toy" :style="{backgroundImage: getImageUrl}">
    <div class="details-container">
      <h3 class="item title">{{toy.name}}</h3>
      <div class="item price">{{toy.price}} $</div>
    </div>
  </section>
</template>
<script>
  import { utilService } from '../services/util.service.js'
  export default {
    props:{
      toy:Object
    },
    computed: {
      getImageUrl() {
        return `url(https://loremflickr.com/320/240/toystory?lock=${utilService.getRandomInt(1,1000)})`
      }
    }
  }
</script>
