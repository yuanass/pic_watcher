<template>
  <div class="nav">
    <div class="bottom">
      <div class="bottom-tab">
        <router-link to="/home/mainPage" class="bottom-items">
          <i class="icon-home3"></i>
          <span class="tap-fonts">主页</span>
        </router-link>
      </div>
      <div class="bottom-tab">
        <router-link to="/home/search" class="bottom-items">
          <i class="icon-baffled"></i>搜索</router-link>
      </div>
      <!--日本动画人博览会-->
      <div class="bottom-tab">
        <router-link to="/home/addPic" class="bottom-items">
          <i class="icon-plus"></i>添加</router-link>
      </div>
      <!-- <div class="bottom-tab">
        <router-link to="/home/message" class="bottom-items">
          <i class="icon-bubble"></i>消息</router-link>
      </div> -->
      <div class="bottom-tab">
        <router-link to="/home/personalInfo" class="bottom-items">
          <i class="icon-user"></i>个人</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    }
  };
</script>

<style lang="scss">
  @import "../../../static/css/reset.css";
  .nav {
    width: 100%;
    height: 1.2rem;
    display: block;
    line-height: 1.2rem;
    position: fixed;
    bottom: -0.6rem;
    // left: 0;
    // background-color: rgb(248, 248, 248);
    // background-color: #fff;
    .bottom {
      display: flex;
      .bottom-tab {
        flex: 1;
        text-align: center;
        font-size: 0.35rem;
        line-height: 0.35rem;
        .bottom-items {
          // color: #333;
          color: rgb(084, 129, 180);
        }
      }
      .active {
        background-color: rgb(084, 129, 180) !important;
        color: #fff !important;
        padding: 0.2rem 0.38rem;
      }
    }
  }
</style>
