<template>
  <div>
    <div class="app-home">
      <a-header :msg="mainMsg"></a-header>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <p-footer v-show="showFooter"></p-footer>
    </div>
    <lookPic v-show="this.$store.state.mainPageStore.showLookPic"></lookPic>
  </div>

</template>

<script>
  import Footer from "../common/footer.vue";
  import header from "../header/header.vue";
  import lookPic from "../common/lookPic.vue";
  export default {
    // provide() {
    //   return {
    //     reload: this.reload
    //   };
    // },
    data() {
      return {
        showFooter: true,
        mainMsg: "YassStation",
        isRouterAlive: true
      };
    },
    computed: {
      bindLookPic() {
        let { showLookPic } = this.$store.state.mainPageStore.showLookPic;
        return {
          showLookPic
        };
      }
    },
    // watch: {
    //   bindLookPic: {
    //     handler() {
    //       let _this = this;
    //       console.log(this.$store.state.mainPageStore.test);
    //       console.log(this.$store.state.mainPageStore.showLookPic);
    //     }
    //   }
    // },
    components: {
      "a-header": header,
      "p-footer": Footer,
      lookPic
    },
    methods: {
      show() {
        // console.log(this.$store.state.mainPageStore.test);
      }
      // reload() {
      //   this.isRouterAlive = false;
      //   this.$nextTick(() => (this.isRouterAlive = true));
      // }
    }
  };
</script>

<style lang="scss">
  @import "../../../static/css/reset.css";
  // .lookPic {
  //   background-color: rgba(11, 11, 11, 0.5);
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   z-index: 99999999;
  // }
</style>
