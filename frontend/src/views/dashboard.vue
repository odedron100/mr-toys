
export default {
  <template>
    <section v-if="toys">
      <chart :toys="toys"/>
    </section>
  </template>

  <script>
  import chart from '@/cmps/chart'
  export default {
  data() {
    return {
      toys: null,
    }
  },
  computed: {
    // typesCountes(){
    //     const toys = this.$store.getters.toys
    //     toys.reduce((acc, toy) => {
    //     if (!acc[toy.type]) acc[toys.type] = 0;
    //     acc[toy.type]++;
    //     return acc;
    //     }, {});
    // }
  },
  created() {
    this.toys = this.$store.getters.toys;
  },
  methods: {

  },
  components: {
    chart
  }
}
  </script>

}
