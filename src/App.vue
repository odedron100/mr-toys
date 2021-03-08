<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    created(){
      console.log('Vue App was created!!!');
      this.$store.dispatch({ type: 'loadToys' })
    }
  }
</script>
