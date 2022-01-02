<template>
  <div id="APP">
    <Nuxt />
    <Header />
  </div>
</template>

<script>
export default {}
</script>

<style>
#__nuxt {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 10px 1fr 10px;
  grid-template-rows: 10px 1fr 10px;
  background-color: #360c8a;
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

main {
  grid-row: 1/2;
  border-radius: 15px 15px 0 0;
  background: white;
}

header {
  grid-row: 2/3;
  position: sticky;
  bottom: 0;
}
</style>
