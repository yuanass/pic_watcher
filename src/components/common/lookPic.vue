<template>
  <div class="lookPicMain">
    <div class="lookPic" @click="closeLookPic">
      <img :src="this.path" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        path: ""
      };
    },
    computed: {
      bindLookPic() {
        let { showLookPic } = this.$store.state.mainPageStore.showLookPic;
        showLookPic = this.path;
        return {
          showLookPic
        };
      }
    },
    watch: {
      bindLookPic: {
        handler() {
          // console.log(this.path);
          if (this.$store.state.mainPageStore.showLookPic === true) {
            this.path = this.$store.state.mainPageStore.lookPicPath;
          }
        }
      }
    },
    methods: {
      closeLookPic() {
        this.$store.state.mainPageStore.showLookPic = false;
        this.path = this.$store.state.mainPageStore.lookPicPath;
      }
    }
  };
</script>

<style lang="scss">
  .lookPicMain {
    // height: calc(100vh);
    // background-color: rgba(11, 11, 11, 0.5);
    .lookPic {
      background-color: rgba(11, 11, 11, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99999999;
      img {
        width: 100%;
        margin-top: 55%;
      }
    }
  }
</style>
