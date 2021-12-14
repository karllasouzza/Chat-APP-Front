<template>
  <div>
    <Nuxt />
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
  grid-template-rows: 10px 1fr 45px 10px;
  background-color: #360c8a;
}

#__layout {
  grid-row: 2/4;
  grid-column: 2/3;

  background-color: #fff;
  
  border-radius: 20px;
}
</style>
