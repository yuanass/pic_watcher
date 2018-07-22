<template>
  <div class="asMain">
    <headerBack :msg="'修改密码'"></headerBack>
    <div class="content">
      <x-input title="原密码" text-align="right" placeholder="请输入原密码" class="psdInput" v-model="oldPsd"></x-input>
      <x-input title="新密码" text-align="right" placeholder="请输入新密码" class="psdInput" v-model="newPsd"></x-input>
      <x-input title="确认新密码" text-align="right" placeholder="请输入新密码" class="psdInput"
        v-model="newPsdCon"></x-input>
      <div class="errorAlert" v-show="this.errorAlert">{{this.errorMsg}}</div>
      <!-- <submitBtn class="submitBtn" @click.native="submit(showInput)"></submitBtn> -->
      <x-button class="submitBtn" @click.native="submit">提交</x-button>
    </div>
    <toast v-model="showToast" width="5rem" position="bottom" type="text" :time="this.toastTime"
      @on-hide="goPersonalInfo">{{this.toastMsg}}</toast>
  </div>
</template>

<script>
  import { XInput, XButton, Toast } from "vux";
  import headerBack from "../../../components/header/headerBack.vue";
  export default {
    data() {
      return {
        oldPsd: "",
        newPsd: "",
        newPsdCon: "",
        judgeOldPsd: false,
        judgeNewPsd: false,
        judgeNewPsdCon: false,
        errorAlert: false,
        errorMsg: "",
        oldPsdReal: "",
        showToast: false,
        toastMsg: "",
        toastTime: 1500
      };
    },
    components: {
      XInput,
      headerBack,
      XButton,
      Toast
    },
    created() {
      this.oldPsdReal = this.$store.state.loginPageStore.userInfo.password;
    },
    computed: {
      judgeOldPsw() {
        let { oldPsd } = this;
        return {
          oldPsd
        };
      },
      judgenewPswCon() {
        let { newPsdCon } = this;
        return {
          newPsdCon
        };
      },
      judgeNewPsw() {
        let { newPsd } = this;
        return {
          newPsd
        };
      }
      // judgeAlert() {
      //   let { judgeOldPsd, judgeNewPsd, judgeNewPsdCon } = this;
      //   return {
      //     judgeOldPsd,
      //     judgeNewPsd,
      //     judgeNewPsdCon
      //   };
      // }
    },
    watch: {
      judgeOldPsw: {
        handler() {
          if (this.oldPsd == "") {
            this.errorAlert = false;
            return;
          } else {
            if (this.oldPsd == this.oldPsdReal) {
              this.judgeOldPsd = true;
              this.errorAlert = false;
            } else {
              this.errorAlert = true;
              this.errorMsg = "密码错误！请重新输入";
            }
          }
        }
      },
      judgenewPswCon: {
        handler() {
          if (this.newPsdCon == "") {
            this.errorAlert = false;
            return;
          } else {
            if (this.newPsdCon != this.newPsd) {
              this.errorAlert = true;
              this.errorMsg = "两次输入不一致，请再次确认密码";
            } else {
              this.errorAlert = false;
              this.judgeNewPsdCon = true;
            }
          }
        }
      },
      judgeNewPsw: {
        handler() {
          if (this.newPsd == "") {
            this.errorAlert = false;
            return;
          } else {
            if (this.newPsd == this.oldPsdReal) {
              this.errorAlert = true;
              this.errorMsg = "新密码不可以和旧密码相同！";
              this.judgeNewPsd = false;
            } else {
              this.errorAlert = false;
              this.judgeNewPsd = true;
            }
          }
        }
      }
    },
    methods: {
      submit() {
        //   console.log(
        //     this.judgeOldPsd + " " + this.judgeNewPsd + " " + this.judgeNewPsdCon
        //   );
        this.judgeAlert();
      },
      disAlert() {
        this.errorAlert = false;
      },
      judgeAlert() {
        if (this.judgeOldPsd == false) {
          this.errorAlert = true;
          this.errorMsg = "密码错误！请重新输入";
          return;
        } else if (this.judgeNewPsd == false) {
          this.errorAlert = true;
          this.errorMsg = "新密码不可以和旧密码相同！";
          return;
        } else if (this.newPsd != this.newPsdCon) {
          this.judgeNewPsdCon = false;
          this.errorAlert = true;
          this.errorMsg = "两次输入不一致，请再次确认密码";
          return;
        } else {
          this.errorAlert = false;
          this.changePsw();
        }
      },
      changePsw() {
        let _this = this;
        let formData = new FormData();
        let psw = {
          userId: this.$store.state.loginPageStore.userInfo.userId,
          newPsw: this.newPsd
        };
        for (let key in psw) {
          formData.append(key, psw[key]);
        }
        this.axios
          .post("http://localhost:3000/changePsw", formData, {
            header: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            // console.log(res);
            if (res.data.whether == true) {
              _this.showToast = true;
              _this.toastMsg = "修改成功！";
            } else {
              _this.showToast = true;
              _this.toastMsg = "十分抱歉，由于未知原因修改失败！";
            }
          });
      },
      goPersonalInfo() {
        this.oldPsd = "";
        this.newPsd = "";
        this.newPsdCon = "";
        this.$router.push({ name: "personalInfo" });
      }
    }
  };
</script>

<style lang="scss">
  .asMain {
    .content {
      padding-top: 0.7rem;
      .psdInput {
        font-size: 0.3rem;
        //   width: 100%;
      }
      .errorAlert {
        font-size: 0.3rem;
      }
      .submitBtn {
        width: 90%;
        height: 0.8rem;
        margin-top: 0.4rem;
        background-color: rgb(84, 129, 180);
        color: #fff;
      }
    }
  }
</style>
