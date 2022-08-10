<template>
  <div :id='name'>
  </div>
</template>

<script setup>
const name = 'JDMapComp';
// 地图相关
import { mapLayer } from "../../utils/map/init/layer.js";
export default {
  name: "home",
  data() {
    return {
      name: name,
      active: 0,
      loading: false
    };
  },
  mounted() {
    this.$Loading.finish();
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
div#JDMapComp {
  width: 100%;
  height: 100%;
}
</style>