<template>
  <div class="cpiMain">
    <x-header :left-options="{backText: '',preventGoBack: true}" class="cpiHeader"
      title='修改个人信息' @on-click-back="goBack()"></x-header>
    <div class="cpiContent" v-for="(item, index) in personalInfoList" :key="index">
      <group>
        <cell title="头像" class="headImg" is-link @click.native="goChangeSomethings(1)">
          <div>
            <!-- <img src="../../../../static/img/y.jpg" alt=""> -->
            <img :src="item.headImg" alt="">
          </div>
        </cell>
        <cell title="用户名" class="cellStyle">
          <span>{{item.userName}}</span>
        </cell>
        <cell title="UID" class="cellStyle">
          <span>{{item.userId}}</span>
        </cell>
        <cell title="性别" class="cellStyle" is-link>
          <!--用actionsheet改-->
          <span>{{item.sex}}</span>
        </cell>
        <cell title="电话号码" class="cellStyle" is-link @click.native="goChangeSomethings(2)">
          <span>{{item.mobile}}</span>
        </cell>
        <cell title="邮箱地址" class="cellStyle" is-link @click.native="goChangeSomethings(3)">
          <span>{{item.email}}</span>
        </cell>
        <cell title="个人简介" class=" userIntroduction" is-link @click.native="goChangeSomethings(4)"
          :inline-desc="item.userIntroduction">
          <!-- <span>{{}}</span> -->
        </cell>
      </group>
    </div>
    <div class="logout">
      <x-button class="logoutBtn" @click.native="logout">退出登陆</x-button>
    </div>
  </div>
</template>

<script>
  import { XHeader, Cell, XButton, Group } from "vux";
  export default {
    data() {
      return {
        personalInfoList: []
      };
    },
    activated() {
      // this.personalInfoList.push(this.$store.state.loginPageStore.userInfo);
    },
    computed: {},
    created() {
      // console.log(this.$store.state.loginPageStore.userInfo);
      this.personalInfoList.push(this.$store.state.loginPageStore.userInfo);
    },
    methods: {
      logout() {
        this.$store.state.loginPageStore.userInfo = {};
        this.$router.push({ name: "personalInfo" });
      },
      goChangeSomethings(index) {
        //index: 1头像 2电话号码 3邮箱地址 4个人简介
        let changeContent;
        switch (index) {
          case 1:
            changeContent = "头像";
            this.$store.state.loginPageStore.changeContent = changeContent;
            break;
          case 2:
            changeContent = "电话号码";
            this.$store.state.loginPageStore.changeContent = changeContent;
            break;
          case 3:
            changeContent = "邮箱地址";
            this.$store.state.loginPageStore.changeContent = changeContent;
            break;
          case 4:
            changeContent = "个人简介";
            this.$store.state.loginPageStore.changeContent = changeContent;
            break;
        }
        // console.log(this.$store.state.loginPageStore.changeContent);
        this.$router.push({
          name: "changeSomethings"
        });
      },
      goBack: function() {
        this.$router.push({ name: "personalInfo" });
      }
    },
    components: {
      XHeader,
      Cell,
      XButton,
      Group
    }
  };
</script>

<style lang="scss">
  .cpiMain {
    background-color: #eeeeee;
    height: calc(100vh);
    .cpiHeader {
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
    .cpiContent {
      padding-top: 0.4rem;
      .headImg {
        font-size: 0.27rem;
        background-color: #fff;
        img {
          width: 1rem;
          height: 1rem;
          margin-right: 0.2rem;
          border-radius: 50%;
        }
      }
      .cellStyle {
        background-color: #fff;
        height: 0.5rem;
        font-size: 0.27rem;
      }
      .userIntroduction {
        // width: 6rem;
        // display: inline-block;
        // white-space: nowrap;
        overflow: hidden;
        // text-overflow: ellipsis;
      }
    }
    .logoutBtn {
      background-color: rgb(084, 129, 180);
      // font-size: 0.4rem;
      color: #fff;
      width: 6.5rem;
      height: 0.75rem;
      font-size: 0.28rem;
      margin-top: 0.35rem;
      // height: 0.8rem;
    }
  }
</style>
