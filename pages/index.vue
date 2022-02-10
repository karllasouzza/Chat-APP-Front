<template>
  <div id="container">
    <UserGreet />
    <UsersStatus />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  layout: 'WithNav',
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;

  grid-row: 2/3;
  grid-column: 3/4;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 45px 15px 145px 1fr;
}
</style>
