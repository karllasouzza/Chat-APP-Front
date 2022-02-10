<template>
  <div id="APP">
    <Nuxt />
    <VLibras />
  </div>
</template>

<script>
import { VLibras } from '@vue-a11y/vlibras'

export default {
  name: 'DefaultLayout',
  components: { VLibras },
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
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
}
</style>
