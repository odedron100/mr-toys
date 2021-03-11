import { toyService } from '../services/toy.service.js'
import { showMsg } from '../services/eventBus.service.js'

  <template>
        <ul class="toy-list-container">
          <li class="toy-container" v-for="toy in toys">
          <toy-preview :toy="toy"/>
            <div class="toy-helpers">
              <button class="remove-toy-button helper" @click="removeToy(toy._id)"><i class="fas fa-trash-alt"></i></button>
              <router-link class="edit-button helper" :to="'/toy/'+toy._id+'/edit'"><i class="fas fa-edit"></i></router-link>
              <router-link class="details-button helper" :to="'/toy/'+toy._id+'/details'"><i class="fas fa-info-circle"></i></router-link>
            </div>
          </li>
        </ul>
    </template>
 <script>
import toyPreview from '@/cmps/toy-preview.vue'
export default {
  props:{
    toys:Array
  },
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {
    removeToy(toyId) {
      this.$emit('removeToy',toyId)
    },
  },
  created() {

  },
  components: {
    toyPreview
  }
}
 </script>
