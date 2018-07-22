<template>
  <div class="personalInfo">
    <!-- <p>personalPage</p> -->
    <div class="main" v-show="this.showLoginPage">
      <div class="showIcon">
        <img src="../../../assets/personalInfo.png" alt="">
      </div>
      <div class="btn">
        <x-button class="submitBtn" @click.native="loginPage">登陆</x-button>
        <x-button class="submitBtn" @click.native="signUpPage">注册</x-button>
      </div>
    </div>
    <div class="personalMain" v-show="this.showPersonalInfo">
      <!-- <div>this is personalInfo {{testGetter}}</div> -->
      <div class="classFor" v-for="(item, index) in userInfoList" v-bind:key="index">
        <div class="btnChangePersonalInfo">
          <span @click="changePersonalInfo" class="btnFont">个人资料</span>
        </div>
        <div class="infoTopPart">
          <div class="headImg">
            <img :src="item.headImg">
          </div>
          <div class="userInfo">
            <div class="userName">用户名:{{item.userName}}</div>
            <div class="userIntroduction">简介:{{item.userIntroduction}}</div>
            <!-- <div class="follerAndLike">follerAndLike</div> -->
          </div>
        </div>
        <div class="userCollect">
          <!-- <userCollect :userId="item.userId"></userCollect> -->
          <card>
            <div slot="content" class="card-demo-flex card-demo-content01">
              <div class="vux-1px-r">
                <span class="title">我关注的</span>
                <br/>
                <span class="num" @click="goFollowPage('1')">{{ meFollow.length }}</span>
              </div>
              <div class="vux-1px-r">
                <span class="title">关注我的</span>
                <br/>
                <span class="num" @click="goFollowPage('2')">{{ followMe.length }}</span>
              </div>
              <div class="vux-1px-r">
                <span class="title">我发布的</span>
                <br/>
                <span class="num" @click="goMyPost">{{ postList.length }}</span>
              </div>
            </div>
          </card>
          <group>
            <cell title="我的收藏夹" is-link @click.native="goMyCollect"></cell>
            <cell title="账户安全" is-link @click.native="goAccountSafe"></cell>
            <!-- <cell title="我发布的插画" is-link @click.native="goMyPost"></cell> -->
          </group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XButton, Cell, Group, Card } from "vux";
  import userCollect from "../../common/userCollect.vue";
  export default {
    data() {
      return {
        showLoginPage: true, //显示用户登陆页面
        showPersonalInfo: false, //显示用户信息页面
        userInfoList: [],
        userId: "",
        myPostLength: "",
        postList: [],
        meFollow: [], //我关注的人
        followMe: [] //关注我的人
        // headImgB: "../../../assets/y.jpg"
      };
    },
    components: {
      XButton,
      userCollect,
      Cell,
      Group,
      Card
    },
    computed: {
      testGetter: function() {
        //在vuex中使用getters获取state
        return this.$store.state.loginPageStore.testGetter;
      },
      userName: function() {
        return this.$store.state.loginPageStore.userInfo.userName;
      },
      headImg: function() {
        //getter
        // get: function() {
        //   return this.$store.state.loginPageStore.userInfo.headImg;
        // },
        // //setter
        // set: function(newValue) {
        //   this.$store.state.loginPageStore.userInfo.headImg = newValue;
        //   return this.$store.state.loginPageStore.userInfo.headImg;
        // }
        return this.$store.state.loginPageStore.userInfo.headImg;
      },
      headImgB: function() {
        let headImgB = this;
        return {
          headImgB
        };
      }
    },
    watch: {
      // headImgB: {
      //   handler() {
      //     let _this = this;
      //     if (_this.headImg === "" || _this.headImg.length === 0) {
      //       _this.headImgB = "../../../assets/y.jpg";
      //     } else {
      //       _this.headImgB = _this.headImg;
      //     }
      //   }
      // }
    },
    created() {
      // console.log(this.$store.state.loginPageStore.userInfo);
      // this.userInfoList[0].userId;
    },
    activated() {
      this.userId = this.$store.state.loginPageStore.userInfo.userId;
      let _this = this;
      if (this.$store.state.loginPageStore.userInfo.userId === undefined) {
        this.showPersonalInfo = false;
        this.showLoginPage = true;
      } else {
        this.showLoginPage = false;
        this.showPersonalInfo = true;
        if (this.headImg === "" || this.headImg.length === 0) {
          this.$store.state.loginPageStore.userInfo.headImg =
            "../../../../static/img/y.jpg";
          this.userInfoList.push(this.$store.state.loginPageStore.userInfo);
          // console.log(this.userInfoList.length);
        } else {
          this.userInfoList.push(this.$store.state.loginPageStore.userInfo);
        }
        this.getMyPost();
        this.myPostLength = this.postList.length;
        this.getUserFollow(this.userId);
        this.getUserBeLikeInfo();
      }
    },
    deactivated() {
      this.userInfoList = [];
      this.postList = [];
      this.meFollow = [];
      this.followMe = [];
    },
    methods: {
      goFollowPage(flag) {
        this.$storage.saveStorage("FOLLOW_FLAG", flag);
        this.$router.push({ name: "followPage" });
      },
      getUserFollow(id) {
        let userId = this.$store.state.loginPageStore.userInfo.userId;
        let formData = new FormData();
        let _this = this;
        let user = {
          userId: userId
        };
        for (let key in user) {
          formData.append(key, user[key]);
        }
        this.axios
          .post("http://localhost:3000/getUserLikeInfo", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            let arr = res.data;
            if (res.data.length == 0) {
              let info = [];
              _this.$storage.saveStorage("ME_FOLLOW", info);
            } else {
              for (let key in arr) {
                if (arr[key].userId == userId) {
                  _this.meFollow.push(arr[key]);
                  _this.$storage.saveStorage("ME_FOLLOW", _this.meFollow);
                }
              }
            }
          });
      },
      getUserBeLikeInfo() {
        let userId = this.$store.state.loginPageStore.userInfo.userId;
        let formData = new FormData();
        let _this = this;
        let user = {
          userId: userId
        };
        for (let key in user) {
          formData.append(key, user[key]);
        }
        this.axios
          .post("http://localhost:3000/getUserBeLikeInfo", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            if (res.data.length == 0) {
              let info = [];
              _this.$storage.saveStorage("FOLLOW_ME", info);
            } else {
              let arr = res.data;
              for (let key in arr) {
                if (arr[key].beFollowedUserId == _this.userId) {
                  _this.followMe.push(arr[key]);
                  _this.$storage.saveStorage("FOLLOW_ME", _this.followMe);
                }
              }
            }
          });
      },
      getMyPost() {
        let formData = new FormData();
        let _this = this;
        let user = {
          userId: this.userId
        };
        for (let key in user) {
          formData.append(key, user[key]);
        }
        this.axios
          .post("http://localhost:3000/getUserPost", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(function(response) {
            let arr = response.data.reverse();
            let i;
            let j;
            for (i = 0; i < arr.length; i++) {
              for (j = i + 1; j < arr.length; j++) {
                if (arr[i].postId == arr[j].postId) {
                  j = ++i;
                }
              }
              _this.postList.push(arr[i]);
            }
            // for (let key in arr) {
            //   _this.postList.push(arr[key]);
            // }
            let arr2 = _this.postList;
            _this.$storage.saveStorage("MY_POST", arr2);
          });
      },
      goAccountSafe() {
        this.$router.push({ name: "accountSafe" });
      },
      goMyPost() {
        this.$router.push({ name: "myPost" });
      },
      goMyCollect() {
        this.$router.push({ name: "myCollect" });
      },
      changePersonalInfo: function() {
        this.$router.push({
          name: "changePersonalInfo"
        });
      },
      loginPage: function() {
        this.$router.push({
          name: "login"
        });
      },
      signUpPage: function() {
        this.$router.push({
          name: "signUp"
        });
      }
      // judgeHeadImg: function() {
      //   if (this.headImg === "" || this.headImg.length === 0) {
      //     this.headImgB = "../../../assets/y.jpg";
      //   } else {
      //     this.headImgB = this.headImg;
      //   }
      // }
    }
  };
</script>

<style lang="scss">
  .personalInfo {
    // margin-top: 0.4rem;
    .main {
      height: calc(100vh - 0.88rem - 1.3rem) !important;
      overflow-y: scroll;
      .showIcon {
        margin-top: 1.2rem;
        text-align: center;
        img {
          width: 2.5rem;
        }
      }
      .btn {
        margin-top: 0.5rem;
        .submitBtn {
          width: 6rem;
          height: 0.8rem;
          color: #fff;
          background-color: rgb(084, 129, 180);
        }
      }
    }
    .personalMain {
      padding-top: 0.6rem;
      font-size: 0.4rem;
      .classFor {
        position: relative;
        .btnChangePersonalInfo {
          font-size: 0.28rem;
          color: #fff;
          background-color: rgb(084, 129, 180);
          width: 1.2rem;
          height: 0.45rem;
          border-radius: 10%;
          text-align: center;
          position: absolute;
          right: 0.25rem;
          top: 0.16rem;
          .btnFont {
            display: inline-block;
            margin-top: 0.08rem;
          }
        }
        .infoTopPart {
          height: 4.35rem;
          background-color: #eeeeee;
          .headImg {
            text-align: center;
            // width: 2.4rem;
            // height: 2.4rem;
            // overflow: hidden;
            img {
              padding: 0.36rem 0 0.28rem;
              border-radius: 50%;
              width: 2.4rem;
              height: 2.4rem;
            }
          }
          .userInfo {
            text-align: center;
            font-size: 0.32rem;
            .userName {
            }
            .userIntroduction {
              max-width: 4rem;
              display: inline-block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        .userCollect {
          .card-demo-flex {
            display: flex;
            .vux-1px-r {
              flex: 1;
              text-align: center;
              .title {
                color: #333;
                font-size: 0.26rem;
              }
              .num {
                color: gray;
                font-size: 0.22rem;
              }
            }
          }
          .card-demo-content01 {
            padding: 0.15rem 0;
          }
          // .card-padding {
          //   padding: 15px;
          // }
          // .card-demo-flex > div {
          //   flex: 1;
          //   text-align: center;
          //   font-size: 0.26rem;
          // }
          // .card-demo-flex span {
          //   color: #333;
          // }
        }
      }
      .submitBtn {
        width: 6rem;
        height: 0.8rem;
        color: #fff;
        background-color: rgb(084, 129, 180);
      }
    }
  }
</style>
