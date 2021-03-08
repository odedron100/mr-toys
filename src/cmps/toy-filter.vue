export default {
  <template>
    <section class="filter">
        <select name="filter" @change="setFilter" >
          <option value="all">All</option>
          <option value="in Stock">In Stock</option>
          <option value="out of stock">Out of stock</option>
        </select>
    </section>
    </template>
    <script>
import { toyService } from '../services/toy-service.js'
import toyList from '@/cmps/toy-list.vue'
  export default {
    data() {
      return {
        activeSerach: 'all',
      }
    },
    methods: {
      setFilter(event) {
        this.activeSerach = event.target.value;
        this.$emit('setFilter', this.activeSerach)
      }
    },
    created() {
      console.log('hi');
    }
  }
</script>
