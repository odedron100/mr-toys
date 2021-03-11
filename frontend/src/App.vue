<template>
  <div class= "web-container">
    <header-app/>
    <router-view></router-view>
  </div>
</template>

<script>
import headerApp from '@/cmps/header-app'
  export default {
    created(){
      console.log('Vue App was created!!!');
      this.$store.dispatch({ type: 'loadToys' })
      // var page = this.$store.getters.currPage
      // if(page === 'homePage'){
      //   this.homePage = true;
      // }
    },
    data(){
      return{
      // isHomePage:false,
      }
    },
    components:{
      headerApp
    },
    // created(){;
      // var page = this.$route.name;
      // if(page === 'homePage'){
      //   this.homePage = true;
      // }
    // }
  }
</script>
