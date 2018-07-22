<template>
  <div class="header">
    <!-- <div class="header-name">
          <div class="back" @click="backTo">
              <i class="icon-arrow-left2"></i>
          </div>
          <span></span>
          <p>{{ msg }}</p>
      </div> -->
    <x-header :left-options="{backText: '',preventGoBack: true}" class="headerBack"
      :title='msg' @on-click-back="goBack()"></x-header>
  </div>
</template>

<script>
  import { XHeader } from "vux";
  export default {
    data() {
      return {};
    },
    props: ["msg"],
    components: {
      XHeader
    },
    methods: {
      goBack: function(event) {
        this.$router.go(-1);
      }
    },
    props: ["msg"]
  };
</script>

<style lang="scss">
  // @import "../../../static/css/reset.css";
  // @import "../../../static/css/style2.css";
  .header {
    // background-color: #eeeeee;
    // height: calc(100vh);
    .headerBack {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 0.6rem;
      position: fixed;
      z-index: 1000;
      background-color: rgb(084, 129, 180);
      .vux-header-left {
        display: flex;
        align-items: center;
        height: 0.4rem;
        justify-content: center;
        left: 0.15rem;
        top: 0.12rem;
        .left-arrow:before {
          width: 0.2rem;
          height: 0.2rem;
          left: 0.25rem;
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
        }
      }
    }
  }

  /* .header {
                      height: 30px;
                      background-color: rgb(084, 129, 180);
                      position: fixed;
                      margin: 0;
                      padding: 0;
                      width: 100%;
                      display: block;
                      z-index: 800;
                      font-size: 22px;
                    }
                    .header-name {
                      font-size: 16px;
                      color: white;
                      font-weight: bold;
                      text-align: center;
                      position: relative;
                      top: 25%;
                    }
                    .back {
                      font-size: 18px;
                      color: white;
                      float: left;
                      /* margin-left:10px;
                    } */
</style>
