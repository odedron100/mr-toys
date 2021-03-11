<template>
  <el-select v-model="value" placeholder="Select" @change="setFilterFromSelect">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'all',
          label: 'All'
        }, {
          value: 'in Stock',
          label: 'In stock'
        }, {
          value: 'out of stock',
          label: 'Out of stock'
        }],
        value: 'all'
      }
    },
  methods:{
    setFilterFromSelect(){
      this.$emit('setFilterFromSelect', this.value)
    }
  }
}
</script>
