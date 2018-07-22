<template>
  <div class="personalDetailMain">
    <div class="personalMain">
      <div class="classFor" v-for="(item, index) in userInfoList" v-bind:key="index">
        <div class="btnChangePersonalInfo">
          <span @click="changePersonalInfo" class="btnFont">个人资料</span>
        </div>
        <div class="infoTopPart">
          <div class="headImg">
            <img :src="item.headImg">
          </div>
          <div class="userInfo">
            <div class="userName">{{item.userName}}</div>
            <div class="userIntroduction">简介:{{item.userIntroduction}}</div>
            <div class="follerAndLike">follerAndLike</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {}
    }
  };
</script>

<style lang="scss">

</style>
