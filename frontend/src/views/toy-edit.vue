
export default {
  <template>
      <form class="toy-edit" @submit.prevent="updatetoy" v-if="toyToEdit">
          <input type="text" placeholder="toy name.." v-model="toyToEdit.name">
          <input type="text" placeholder="toy price.." v-model="toyToEdit.price">
          <input type="text" placeholder="toy type.." v-model="toyToEdit.type">
          <button>Update</button>
      </form>
  </template>

  <script>
  import { toyService } from '../services/toy-service.js'
import { showMsg } from '../services/event-bus.service.js'
  export default {
  data() {
    return {
      toyToEdit:{},
    }
  },
  computed: {
  },
  created() {
    const toyId = this.$route.params.toyId
    toyService.getById(toyId)
      .then(toy => this.toyToEdit = JSON.parse(JSON.stringify(toy)))
  },
  methods: {
    updatetoy() {
      toyService.save(this.toyToEdit)
      this.$router.push('/toy')
      this.$store.dispatch({ type: 'saveToys', toy: this.toyToEdit })
        .then(() => {
          // showMsg('toy update');
        })
    }
  },
  components: {
  }
}
  </script>

}
