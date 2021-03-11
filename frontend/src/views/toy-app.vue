
<template>
    <div class="toy-app-container">
        <toy-filter @setFilter="setFilter"/>
        <toy-list :toys="toys" @removeToy="removeToy" />
        <section class="add-toy-container">
            <div class="add-item-inputs">
                <input type="text" placeholder="New name.." v-model="toyToEdit.name" />
                <input type="text" placeholder="New type.." v-model="toyToEdit.type" />
                <input type="text" placeholder="New price.." v-model="toyToEdit.price" />
            </div>
            <button class="add-toy" @click="addToy">Add new toy</button>
        </section>
        <router-link class="dashboard-link" to="toy/dashboard">GO TO DASHBOARD</router-link>
    </div>
</template>
<script>
import { toyService } from '../services/toy-service.js'
import toyList from '@/cmps/toy-list.vue'
import toyFilter from '@/cmps/toy-filter.vue'
import { showMsg } from '../services/event-bus.service.js'
// import userMsg from '@/cmps/user-msg.vue'
  export default {
    data() {
        return {
            toyToEdit: toyService.getEmptyToy(),
        }
    },
    computed: {
        toys(){
         return this.$store.getters.toys
        },
    },
    created() {
      console.log('this.toys', this.toys);
    },
    methods: {
        removeToy(toyId) {
            this.$store.dispatch({ type: 'remove', toyId })
                .then(() => {
                    showMsg('toy remove', 'danger');
                })
        },
        addToy() {
            const toyToAdd = JSON.parse(JSON.stringify(this.toyToEdit));
            this.$store.dispatch({ type: 'saveToys', toy: toyToAdd }).then(() => {
                this.toyToEdit = toyService.getEmptyToy()
            })
        },
        setFilter(newFilterBy) {
            this.$store.commit({ type: 'setFilter',filterBy: newFilterBy})
            this.$store.dispatch({ type: 'loadToys' })
        },
    },
    components: {
        toyList,
        toyFilter,
        // userMsg,
        // loading,
    }
  }
</script>
