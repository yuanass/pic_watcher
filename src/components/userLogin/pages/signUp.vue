<template>
  <div class="signUpMain">
    <!-- <div class="title">signUpPage</div> -->
    <!-- <x-header :left-options="{backText: '',preventGoBack: true}" class="cpiHeader"
      title='修改个人信息' @on-click-back="goBack()"></x-header> -->
    <headerBack :msg="'用户注册'"></headerBack>
    <div class="userInput">
      <x-input title="用户名" type="text" v-model="user.username" placeholder="请输入用户名"></x-input>
      <x-input title="密码" :type="this.password" v-model="user.password" placeholder="请输入密码">
        <img slot="right" @click="changePasswordShow" src="../../../assets/logo.png" class="changePic"
        />
      </x-input>
      <x-input title="邮箱地址" type="text" v-model="user.email" placeholder="请输入邮箱地址"></x-input>
      <x-input title="手机号码" type="text" v-model="user.mobile" placeholder="请输入手机号码"></x-input>
    </div>
    <div class="submit">
      <x-button class="submitBtn" @click.native="submit">提交</x-button>
    </div>
    <toast v-model="existToast" width="5rem" position="bottom" type="text" :time="this.toastTime"
      @on-hide="turnExistToast">{{this.signUpToast}}</toast>
  </div>
</template>

<script>
  import { XInput, XButton, Toast } from "vux";
  import Vue from "vue";
  import axios from "axios";
  import headerBack from "../../header/headerBack.vue";
  export default {
    data() {
      return {
        password: "text",
        existToast: false, //账户名已存在时弹出的提示框
        toastTime: 1500, //toast提示框存在的时间
        signUpToast: "",
        user: {
          username: null,
          password: null,
          mobile: null,
          email: null,
          sex: null,
          photo: null,
          intro: null
        }
      };
    },
    components: {
      XInput,
      XButton,
      Toast,
      headerBack
    },
    methods: {
      changePasswordShow: function() {
        if (this.password === "text") {
          this.password = "password";
        } else {
          this.password = "text";
        }
      },
      submit: function() {
        let _this = this;
        let userExistJudge = new FormData();
        userExistJudge.append(0, this.user);
        let formData = new FormData();
        let userNameExist; //true为用户输入的注册账户名可用（不存在）false为账户名不可用
        for (let key in this.user) {
          //读取data中所要上传的内容循环append到fordata中
          if (key) {
            formData.append(key, this.user[key]);
          }
        }
        //判断账户名是否已存在
        this.axios
          .post("http://localhost:3000/userNameExist", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(function(response) {
            // console.log(response);
            userNameExist = response.data;
            if (userNameExist === true) {
              //用户注册
              _this.axios
                .post("http://localhost:3000/add3", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                })
                .then(function(response) {
                  // console.log(response);
                  _this.existToast = true;
                  _this.signUpToast = "注册成功";
                });
            } else {
              _this.existToast = true;
              _this.signUpToast = "用户名已存在，请重新输入";
            }
          });
      },
      turnExistToast: function() {
        this.existToast = false;
      }
    }
  };
</script>

<style lang="scss">
  .signUpMain {
    .title {
      font-size: 0.4rem;
    }
    .userInput {
      font-size: 0.3rem;
      padding-top: 0.7rem;
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
</style>
