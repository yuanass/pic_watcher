<template>
  <div class="loginMain">
    <!-- <p class="title">thisis login</p> -->
    <headerBack :msg="'登陆'"></headerBack>
    <div class="loginPic">
      <img src="@a/2.png" alt="">
    </div>
    <div class="loginInput">
      <div class="userInput">
        <x-input title="用户名" type="text" v-model="user.username" placeholder="请输入用户名"></x-input>
        <x-input title="密码" :type="this.password" v-model="user.password" placeholder="请输入密码">
          <img slot="right" @click="changePasswordShow" src="../../../assets/logo.png" class="changePic"
          />
        </x-input>
      </div>
      <div class="submit">
        <x-button class="submitBtn" @click.native="submit">提交</x-button>
      </div>
    </div>
    <toast v-model="loginToast" width="5rem" position="bottom" type="text" :time="this.toastTime"
      @on-hide="turnToast">{{this.message}}</toast>
    <alert v-model="showAlert" title="登录失败" content="你的账号已被封禁，请联系管理员了解更多信息" style="padding:0;"></alert>
  </div>
</template>

<script>
  import { XInput, XButton, Toast, Alert } from "vux";
  import headerBack from "../../header/headerBack.vue";
  export default {
    data() {
      return {
        password: "password",
        loginToast: false, //显示登陆提示的toast
        message: "",
        toastTime: 1500,
        user: {
          username: null,
          password: null
        },
        showAlert: false
      };
    },
    components: {
      XInput,
      XButton,
      Toast,
      headerBack,
      Alert
    },
    created() {},
    methods: {
      changePasswordShow: function() {
        if (this.password === "text") {
          this.password = "password";
        } else {
          this.password = "text";
        }
      },
      submit: function() {
        let formData = new FormData();
        let toast;
        let _this = this;
        for (let key in this.user) {
          //读取data中所要上传的内容循环append到fordata中
          if (key) {
            formData.append(key, this.user[key]);
          }
        }
        this.axios
          .post("http://localhost:3000/userLogin", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(function(response) {
            // console.log(response);
            toast = response.data;
            // console.log(toast);
            if (toast.whether === false) {
              _this.loginToast = true;
              _this.message = "账号或密码错误，请重新输入";
            } else if (toast.whether === true) {
              // console.log();
              if (toast.result.status == "true") {
                _this.$store.commit("loginPageStore/saveUserInfo", toast.result);
                // console.log(_this.$store.state.loginPageStore.userInfo);
                _this.loginToast = true;
                _this.message = "登陆成功";
              } else if (toast.result.status == "false") {
                _this.showAlert = true;
              }
            }
          });
        //返回0为账号或密码错误
        //返回1为账号和密码正确
      },
      turnToast: function() {
        this.loginToast = false;
        this.$router.push({ name: "personalInfo" });
      }
    }
  };
</script>

<style lang="scss">
  .loginMain {
    .vux-alert {
      .vux-x-dialog {
        .weui-dialog {
          .weui-dialog__hd {
            padding: 0;
          }
        }
      }
    }
    .loginPic {
      img {
        padding-top: 0.6rem;
        width: 100%;
      }
    }
    .loginInput {
      // padding-top: 0.7rem;
      .title {
        font-size: 0.4rem;
      }
      .userInput {
        font-size: 0.3rem;
        .changePic {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .submit {
        margin-top: 0.2rem;
        .submitBtn {
          width: 6rem;
          height: 0.8rem;
          color: #fff;
          background-color: rgb(084, 129, 180);
        }
      }
    }
  }
</style>
