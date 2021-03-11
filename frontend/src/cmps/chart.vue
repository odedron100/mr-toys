<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    toys: Array,
  },
  data() {
    return {
      typesCountes: {},
    };
  },
  created() {
    this.typesCountes = this.toys.reduce((typesCountes, toy) => {
      if (!typesCountes[toy.type]) typesCountes[toy.type] = 0;
      if(toy.inStock) typesCountes[toy.type]++;

      return typesCountes;
    }, {});

  },
  computed: {
    labels() {
      return Object.keys(this.typesCountes)
    },
    typesStock(){
        return this.labels.map(label => +(this.typesCountes[label] / this.toys.length *100).toFixed(2))
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#FF7F50","#f87979","#52fefe", "#373476", "#976",],
            data: this.typesStock,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>
