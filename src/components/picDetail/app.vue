<template>
  <div class="picDetail">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  .picDetail {
    height: calc(100vh) !important;
    overflow-y: scroll;
  }
</style>
