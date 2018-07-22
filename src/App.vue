<template>
  <div id="app">
    <div class="view">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- <p-footer v-show="showFooter"></p-footer> -->
  </div>
</template>

<script>
  import Footer from "./components/common/footer.vue";
  export default {
    // data() {
    //   return {
    //     showFooter: ""
    //   };
    // },
    // created() {
    //   this.showFooter = true;
    // },
    // methods: {
    //   show(bool) {
    //     this.showFooter = bool;
    //   }
    // },
    // components: {
    //   "p-footer": Footer
    // }
  };
</script>

<style lang="scss">
  @import "../static/css/reset.css";
</style>
