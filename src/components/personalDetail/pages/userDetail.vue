<template>
  <div>
    <headerBack :msg="'详细信息'"></headerBack>
    <div class="userMain">
      <div class="classFor" v-for="(item, index) in userInfo" v-bind:key="index">
        <!-- <div class="btnChangePersonalInfo">
          <span @click="changePersonalInfo" class="btnFont">个人资料</span>
        </div> -->
        <div class="infoTopPart" :style="{ 'background-image': 'url(' + item.headImg + ')','background-repeat':'no-repeat','background-size':'cover', 'padding-top': '0.5rem' }">
          <!-- <img class="tPic" :src="item.headImg" alt="" style=""> -->
          <div class="headImg">
            <img :src="item.headImg">
          </div>
          <div class="userInfo">
            <div class="hey" v-show="notSelf == true">
              <div class="follow" v-show="followed == false">
                <x-button class="followBtn" @click.native="likeUser(item.userId)">关注</x-button>
              </div>
              <div class="followed" v-show="followed == true">
                <x-button class="followBtn" @click.native="disLikeUser(item.userId)">已关注</x-button>
              </div>
            </div>
            <!-- <div class="userIntroduction">简介:{{item.userIntroduction}}</div> -->
            <!-- <div class="follerAndLike">follerAndLike</div> -->
          </div>
        </div>
        <div class="block">
          <div class="userName">{{item.userName}}</div>
          <div class="intro" v-if="item.userIntroduction.length != 0">
            <!-- 简介:{{item.userIntroduction}} -->
            <cell title="个人简介" class=" userIntroduction" :inline-desc="item.userIntroduction">
            </cell>
          </div>
          <div class="intro" v-else>
            <cell title="个人简介" class=" userIntroduction" inline-desc="这个人很懒哦~什么都没写">
            </cell>
          </div>
          <div class="biaoti">TA的发布</div>
          <div class="postItem">
            <ul>
              <li v-for="(item, index) in postList" :key="index">
                <div class="postBlock" @click="goPicDetail(item)">
                  <div class="date">{{item.postDate}}</div>
                  <img class="post" :src="item.post" alt="">
                  <div class="postTitle">{{item.postTitle}}</div>
                </div>
                <div class="divide">&nbsp;</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import headerBack from "../../header/headerBack.vue";
  import { Cell, Group, XButton } from "vux";
  export default {
    data() {
      return {
        headIndex: "",
        userInfo: [],
        a: "",
        followed: false,
        showPartText: false,
        showHoleText: false,
        postList: [],
        notSelf: false //判断该用户是不是登录用户自己
      };
    },
    components: {
      headerBack,
      Cell,
      Group,
      XButton
    },
    // activated() {
    //   this.headIndex = this.$storage.loadStorage("_HEAD_INDEX_");
    //   console.log(this.headIndex);
    //   this.getUserInfoById(this.headIndex);
    // },
    activated() {
      this.a = this.$storage.loadStorage("_USER_INFO_FROM_HEADIMG_");
      // console.log(this.a);
      if (this.a[0].userId == this.$store.state.loginPageStore.userInfo.userId) {
        this.notSelf = false;
      } else {
        this.notSelf = true;
      }
      // console.log(this.a[0].userIntroduction);
      if (this.a[0].userIntroduction.length > 50) {
        this.showPartText = true;
      } else {
        this.showHoleText = true;
      }
      let id = this.a[0].userId;
      // console.log(id);
      this.getUserPost(id);
      this.getUserInfo();
      if (
        this.$store.state.loginPageStore.userInfo.userId != "" ||
        this.$store.state.loginPageStore.userInfo.userId != undefined ||
        this.$store.state.loginPageStore.userInfo.userId.length != 0
      ) {
        this.getUserFollow(id);
      }
    },
    deactivated() {
      this.followed = false;
      this.postList = [];
    },
    methods: {
      getUserFollow(id) {
        let userId = this.$store.state.loginPageStore.userInfo.userId;
        // console.log(userId);
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
            // console.log(res);
            let arr = res.data;
            for (let key in arr) {
              if (arr[key].beFollowedUserId == id) {
                _this.followed = true;
              } else {
                return; //终止当前函数的执行
              }
            }
          });
      },
      getUserPost(userId) {
        let formData = new FormData();
        let _this = this;
        let user = {
          userId: userId
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
            // console.log(response.data);
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
            // _this.postList = response.data;
          });
      },
      goPicDetail(item) {
        this.$storage.saveStorage("_CHOICED_ITEM_", item);
        this.$router.push({
          name: "picDetail",
          params: {
            postId: item.postId
          }
        });
      },
      likeUser(id) {
        this.followed = true;
        let userId = this.$store.state.loginPageStore.userInfo.userId;
        let beFollowedUserId = id;
        let formData = new FormData();
        let _this = this;
        let follow = {
          userId: userId,
          beFollowedUserId: beFollowedUserId
        };
        for (let key in follow) {
          formData.append(key, follow[key]);
        }
        this.axios
          .post("http://localhost:3000/userLike", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            // console.log(res);
          });
      },
      disLikeUser(id) {
        this.followed = false;
        let userId = this.$store.state.loginPageStore.userInfo.userId;
        let beFollowedUserId = id;
        let formData = new FormData();
        let _this = this;
        let follow = {
          userId: userId,
          beFollowedUserId: beFollowedUserId
        };
        for (let key in follow) {
          formData.append(key, follow[key]);
        }
        this.axios
          .post("http://localhost:3000/deleteUserLike", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            // console.log(res);
          });
      },
      getUserInfo() {
        this.userInfo = this.a;
      },
      judgeLength(str) {
        return;
      },
      getUserInfoById(id) {
        let formData = new FormData();
        let _this = this;
        let user = {
          userId: id
        };
        for (let key in user) {
          formData.append(key, user[key]);
        }
        this.axios
          .post("http://localhost:3000/getUserById", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(function(response) {
            // _this.headImgPath.push(response.data[0]);
            // console.log(_this.headImgPath);
            _this.userInfo = response.data;
            // console.log(_this.userInfo);
            // console.log(_this.userInfo.userIntroduction);
            this.judgeLength(_this.userInfo.userIntroduction);
          });
      }
    }
  };
</script>

<style lang="scss">
  .userMain {
    padding-top: 0.58rem;
    font-size: 0.4rem;
    height: calc(100vh);
    .classFor {
      position: relative;
      .btnChangePersonalInfo {
        font-size: 0.28rem;
        color: #fff;
        background-color: #bbbbbb;
        width: 1.2rem;
        height: 0.45rem;
        border-radius: 22%;
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
        position: relative;
        height: 4rem;
        background-color: #eeeeee;
        display: flex;
        .tPic {
          position: absolute;
          overflow: hidden;
          width: 100%;
          z-index: 1;
        }
        .headImg {
          flex: 5;
          padding-top: 2.9rem;
          padding-left: 0.3rem;
          z-index: 100;
          img {
            // padding: 0.36rem 0 0.28rem;
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            border: 0.05rem solid #ffffff;
          }
        }
        .userInfo {
          flex: 1;
          padding-top: 4.2rem;
          padding-right: 0.5rem;
          text-align: center;
          font-size: 0.32rem;
          .follow {
            // flex: 1;
            .followBtn {
              font-size: 0.25rem;
              background-color: rgb(84, 129, 180);
              color: #fff;
              width: 1.4rem;
              height: 0.6rem;
            }
          }
          .followed {
            .followBtn {
              font-size: 0.25rem;
              color: #fff;
              width: 1.4rem;
              height: 0.6rem;
              background-color: #bbbbbb;
            }
          }
        }
      }
      .block {
        margin-top: 1.1rem;
        .userName {
          color: #333;
          font-size: 0.45rem;
          padding-bottom: 0.1rem;
          padding-left: 0.3rem;
        }
      }
      .intro {
        .userIntroduction {
          font-size: 0.32rem;
        }
      }
      .biaoti {
        padding-left: 0.1rem;
        padding-top: 0.05rem;
        height: 0.35rem;
        // width: 100%;
        background-color: #eeeeee;
        color: #6f6f6f;
        font-size: 0.27rem;
        line-height: 0.35rem;
      }
      .postItem {
        width: 100%;
        height: 3rem;
        // margin: 0.1rem 2% 0 1.5%;
        .postBlock {
          display: block;
          // border: 1px solid #eeeeee;
          margin-top: 0.15rem;
          position: relative;
          // height: 5.5rem;
          padding-bottom: 0.25rem;
          .date {
            font-size: 0.3rem;
            color: #6f6f6f;
            padding-bottom: 0.05rem;
            padding-left: 0.15rem;
          }
          img {
            width: 94%;
            margin: 0.1rem 3% 0%;
            // height: 100%;
            height: 4.5rem;
          }
          .postTitle {
            width: 96%;
            bottom: 0.25rem;
            word-wrap: break-all;
            padding: 0.1rem 0.15rem 0.15rem;
            font-size: 0.3rem;
            color: #333;
            position: absolute;
            background-color: rgba(255, 255, 255, 0.75);
          }
        }
        .divide {
          background-color: #eeeeee;
          height: 0.16rem;
        }
      }
    }
    .submitBtn {
      width: 6rem;
      height: 0.8rem;
      color: #fff;
      background-color: rgb(084, 129, 180);
    }
  }
</style>
