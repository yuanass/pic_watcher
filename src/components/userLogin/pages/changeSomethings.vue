<template>
  <div class="csMain">
    <x-header :left-options="{backText: '',preventGoBack: true}" class="cpiHeader"
      :title="this.title" @on-click-back="goBack()"></x-header>
    <div class="content">
      <div class="changeHeadImg" v-show="this.showInput === '1'">
        <x-button class="changeFileBtn" @click.native="getInputFile">更换头像</x-button>
        <input type="file" id="file1" class="changeFile" @change="showme" style="display:none;">
        <img class="imgInput" :src="imgInput">
      </div>
      <div class="changeMobile" v-if="this.showInput === '2'">
        <x-input title="电话号码" text-align="right" placeholder="请输入电话号码" class="mobileInput"
          v-model="users.mobile"></x-input>
      </div>
      <div class="changeEmail" v-if="this.showInput === '3'">
        <x-input title="邮箱地址" text-align="right" placeholder="请输入邮箱地址" class="emailInput"
          v-model="users.email"></x-input>
      </div>
      <div class="changeUI" v-if="this.showInput === '4'">
        <x-input title="个人简介" text-align="right" placeholder="请输入个人简介~" class="uiInput"
          v-model="users.userIntroduction"></x-input>
      </div>
    </div>
    <submitBtn class="submitBtn" @click.native="submit(showInput)" style="margin-top: 0.4rem;"></submitBtn>
    <toast type="text" width="5rem" v-model="showToast" @on-hide="changeSuccess" :time="this.toastTime"
      position="bottom">{{this.toastText}}</toast>
  </div>
</template>

<script>
  import { XButton, XInput, Toast, XHeader } from "vux";
  export default {
    data() {
      return {
        changeContent: "", //用户想要修改的内容
        showInput: "", //从上一个页面获取控制修改项显示的变量
        imgInput: this.$store.state.loginPageStore.userInfo.headImg, //获取原本头像
        showToast: false, //控制toast显示的变量
        toastText: "", //点击提交后的提示信息
        toastTime: 1500,
        title: "",
        showMeCount: 0,
        users: {
          userId: this.$store.state.loginPageStore.userInfo.userId,
          userName: this.$store.state.loginPageStore.userInfo.userName,
          password: this.$store.state.loginPageStore.userInfo.password,
          email: this.$store.state.loginPageStore.userInfo.email,
          mobile: this.$store.state.loginPageStore.userInfo.mobile,
          sex: this.$store.state.loginPageStore.userInfo.sex,
          headImg: this.$store.state.loginPageStore.userInfo.headImg,
          userIntroduction: this.$store.state.loginPageStore.userInfo
            .userIntroduction,
          uploadType: 0 //0为没图片，1为有图片
        }
      };
    },
    components: {
      XButton,
      XInput,
      Toast,
      XHeader
    },
    created() {
      // console.log(this.users);
      this.changeContent = this.$store.state.loginPageStore.changeContent;
      this.title = this.changeContent;
      switch (this.changeContent) {
        case "头像":
          this.showInput = "1";
          break;
        case "电话号码":
          this.showInput = "2";
          break;
        case "邮箱地址":
          this.showInput = "3";
          break;
        case "个人简介":
          this.showInput = "4";
          break;
      }
    },
    methods: {
      getInputFile() {
        document.getElementById("file1").click();
      },
      goBack() {
        this.$router.push({ name: "changePersonalInfo" });
      },
      changeSuccess() {
        this.$router.push({ name: "changePersonalInfo" });
      },
      submit(showInput2) {
        // this.users = this.$store.state.loginPageStore.userInfo;
        // console.log(showInput2);
        let _this = this;
        if (showInput2 === "2" || showInput2 === "3" || showInput2 === "4") {
          this.users.uploadType = 0;
        } else if (showInput2 === "1") {
          // console.log(typeof _this.showMeCount);
          if (_this.showMeCount <= 0) {
            _this.users.uploadType = 0;
          } else if (_this.showMeCount > 0) {
            _this.users.uploadType = 1;
          }
        }
        // console.log(this.users.uploadType);
        var formdata = new FormData();
        for (var key in this.users) {
          if (key) {
            formdata.append(key, this.users[key]);
          }
        }
        this.axios
          .post("http://localhost:3000/updateUserInfo", formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(function(response) {
            // console.log(response.data);
            if (response.data.we === true) {
              _this.showToast = true;
              _this.toastText = "修改成功";
              _this.users.headImg = response.data.showPath;
              if (_this.users.uploadType === 1) {
                _this.axios
                  .post("http://localhost:3000/add4", formdata, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      "Content-Type": "application/x-www-form-urlencoded"
                    }
                  })
                  .then(function(response) {});
              }
            } else {
              _this.showToast = true;
              _this.toastText = "修改失败";
            }
          });
        this.$store.commit("loginPageStore/saveUserInfo", this.users);
      },
      back: function() {
        this.$router.go(-1);
      },
      showme: function(e) {
        this.showMeCount++;
        // console.log(this.showMeCount);
        var self = this;
        var inputDOM = e.target;
        var reader = new FileReader();
        reader.onload = function(e) {
          self.imgInput = e.target.result;
        };
        reader.readAsDataURL(inputDOM.files[0]);
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.users.headImg = files[0];
        // console.log(files[0]);
        this.$store.state.loginPageStore.userInfo.headImg = files[0];
      },
      changeFileBtn: function() {}
    }
  };
</script>

<style lang="scss">
  .csMain {
    font-size: 0.4rem;
    background-color: #eeeeee;
    height: calc(100vh);
    .cpiHeader {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 0.6rem;
      position: fixed;
      top: 0;
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
    .content {
      // margin-top: 1rem;
      .changeHeadImg {
        padding-top: 0.6rem;
        background-color: #fff;
        .imgInput {
          width: 4rem;
          height: 4rem;
        }
        .changeFile {
          width: 2rem;
          height: 0.5rem;
          // display: none;
        }
        .changeFileBtn {
          width: 2rem;
          height: 0.8rem;
        }
      }
      .changeMobile {
        padding-top: 0.6rem;
        background-color: #fff;
        font-size: 0.3rem;
      }
      .changeEmail {
        padding-top: 0.6rem;
        background-color: #fff;
        font-size: 0.3rem;
      }
      .changeUI {
        padding-top: 0.6rem;
        background-color: #fff;
        font-size: 0.3rem;
      }
    }
  }
</style>
