<template>
  <aside class="popUp">
    <GroupAdd />
  </aside>
</template>

<script>
import GroupAdd from '~/assets/icons/GroupAdd.vue'
export default {
  components: { GroupAdd },
}
</script>

<style lang="scss" scoped>
.popUp {
  width: 54px;
  height: 54px;

  border-radius: 16px;
  background: $Tertiary90;
  @include Elevation_2;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 10px;
  bottom: 15px;
}
</style>
