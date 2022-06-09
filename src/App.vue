<template>
  <router-view/>
</template>
<script>
import axios from 'axios'
import { provide } from 'vue'
export default {
  setup() {
      provide('axios', axios);
  }
}
</script>
<style lang="scss">
@import url("./assets/style/style.css");
</style>
