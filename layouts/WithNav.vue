<template>
  <div id="APP">
    <Nuxt />
    <NavBar />
    <VLibras />
  </div>
</template>

<script>
import { VLibras } from '@vue-a11y/vlibras'
import NavBar from '~/components/NavBar.vue'

export default {
  name: 'LayoutWithNavBar',
  components: { VLibras, NavBar },
  head() {
    return this.$nuxtI18nHead()
  },
}
</script>

<style scoped>
#__nuxt {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 10px 1fr 10px;
  grid-template-rows: 10px 1fr 10px;
}

#__layout {
  width: 100%;
  height: 100%;

  grid-row: 2/3;
  grid-column: 2/3;
}

#APP {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 10px 5px 1fr 5px 10px;
  grid-template-rows: 5px 1fr 40px 5px;
}
</style>
