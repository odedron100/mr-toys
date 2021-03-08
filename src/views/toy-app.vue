
<template>
    <div class="toy-app-container">
        <toy-filter @setFilter="setFilter"/>
        <toy-list :toys="toysToShow" @emptyToyToEdit="emptyToyToEdit" @onToyClicked="onToyClicked"/>
        <button class="add-toy" @click="addToy">Add new toy</button>
        <input type="text" placeholder="New toy.." v-model="toyToEdit.name" />
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
        toysToShow() {
            return this.$store.getters.toysToShow
        },
        // sorttoys() {
        //     var toys = this.$store.getters.toys
        //     toys.sort(function (a, b) {
        //         return a - b;
        //     });
        //     return toys;
        // }
    },
    created() {
      console.log('this.toys', this.toys);
    },
    methods: {
        emptyToyToEdit() {
            this.toyToEdit = toyService.getEmptyToy();
        },
        addToy() {
            this.$store.dispatch({ type: 'saveToys', toy: this.toyToEdit }).then(() => {
                this.toyToEdit = toyService.getEmptyToy()
                // console.log('after');
                // showMsg('toy added');
            })
        },
        setFilter(newFilterBy) {
            this.$store.dispatch({ type: 'setFilter',newFilterBy })
        },
        onToyClicked(toyId) {
            console.log('toyId', toyId);
            this.$store.dispatch({ type: 'onToyClicked', toyId })
        },
        // sort() {
        //     this.$store.getters.sort;
        //     // var toys = this.$store.getters.toys
        //     // toys.sort(function (a, b) {
        //     //     return a - b;
        //     // });
        // }
    },
    components: {
        toyList,
        toyFilter,
        // userMsg,
        // loading,
    }
  }
</script>
