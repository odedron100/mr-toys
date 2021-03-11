export default {
  <template>
    <section class="filter">
      <input ref="toySearch" class="search-filter" type="text" @input="setFilter" placeholder="Search...." v-model="filter.name">
        <selectCmp @setFilterFromSelect="setFilterFromSelect"></selectCmp>
      <button class="sort-button" @click="sort">sort</button>
    </section>
    </template>
    <script>
  import { toyService } from '../services/toy-service.js'
  import toyList from '@/cmps/toy-list.vue'
  import selectCmp from '@/cmps/selectCmp.vue'
  export default {
    data() {
      return {
        filter:{
          isInStock: 'all',
          name:'',
          sortBy: false
        }
      }
    },
    methods: {
      setFilterFromSelect(value){
        this.filter.isInStock = value;
        this.$emit('setFilter', this.filter)
      },
      setFilter() {
        this.$emit('setFilter', this.filter)
      },
      sort() {
        this.filter.sortBy=!this.filter.sortBy
        this.$emit('setFilter', this.filter);
      }
    },
    created() {
      console.log('hi');
    },
    components:{
      selectCmp
    }
  }
</script>
