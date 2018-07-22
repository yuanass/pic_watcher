<template>
  <div class="latest">
    <div class="latestMain">
      <ul>
        <li class="statesItem" v-for="(item,index) in allPost" :key="index">
          <div class="userInfo">
            <div class="userHeadImg">
              <headImg class="headImg" :headIndex="item.userId"></headImg>
            </div>
            <div class="userName">
              <div class="name">{{item.userName}}</div>
              <div class="time">{{item.postDate}}</div>
            </div>
          </div>
          <div class="statesText" v-show="showPartText === true">
            <div class="title">
              <p>{{item.postTitle}}</p>
            </div>
            <div class="text">
              <p>{{item.postText}}
              </p>
            </div>
          </div>
          <span class="clickText" @click="showHoleText" v-show="showPartText === true && item.postText.length >= 50"
            value="click" style="font-size:0.25rem;padding-left: 0.2rem;color: rgb(084, 129, 180);">查看更多</span>
          <div class="statesText2" v-show="showAllText === true">
            <div class="title">
              <p>{{item.postTitle}}</p>
            </div>
            <div class="text">
              <p>{{item.postText}}
              </p>
              <span class="clickText" @click="showHoleText" value="click" style="font-size:0.25rem;padding-left: 0rem;color: rgb(084, 129, 180);">关闭</span>
            </div>
          </div>
          <div class="statesPhoto">
            <img :src="item.post" alt="" @click="lookPic(item.post)">
          </div>
          <div class="statesOptions">
            <div class="like">
              <!-- <img src="@a/like.png" alt="" @click="like"> -->
              <!-- <like :postId="item.postId" v-on:getLikeRes="likeRes"></like> -->
              <userThumb :postId="item.postId"></userThumb>
            </div>
            <div class="comments">
              <img src="@a/comments.png" alt="" @click="goPicDetail(item)">
            </div>
            <div class="collect">
              <!-- <img src="@a/fav.png" alt=""> -->
              <collect :postId="item.postId" v-on:getAddCollectRes="addCollectRes"></collect>
            </div>
            <div class="blank">
              <span>&nbsp;</span>
            </div>
          </div>
        </li>
      </ul>
      <!--分割线-->
    </div>
    <toast v-model="addCollectToast" width="5rem" position="default" type="text" :time="this.toastTime"
      @on-hide="turnToast">{{this.message}}</toast>
  </div>
</template>

<script>
  import lookPic from "../../common/lookPic.vue";
  import headImg from "../../common/headImg.vue";
  import collect from "../component/collect.vue";
  import like from "../component/like.vue";
  import userThumb from "../component/thumb.vue";
  import { Toast } from "vux";
  export default {
    data() {
      return {
        allPost: [],
        showLookPic: false,
        mockAllPost2: [],
        // allPost: [],
        showPartText: true,
        showAllText: false,
        addCollectToast: false, //控制添加收藏的toast显示
        message: "", //toast显示的内容
        toastTime: 1500,
        thumbArr: []
      };
    },
    components: {
      headImg,
      collect,
      Toast,
      like,
      userThumb
    },
    computed: {
      goTest() {}
    },
    created() {
      // this.axios
      //   .get("http://localhost:3000/selectAllPost", {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     }
      //   })
      //   .then(response => {
      //     let arr = response.data;
      //     let i;
      //     let j;
      //     for (i = 0; i < arr.length; i++) {
      //       for (j = i + 1; j < arr.length; j++) {
      //         if (arr[i].postId == arr[j].postId) {
      //           j = ++i;
      //         }
      //       }
      //       // this.allPost.push(arr[i]);
      //     }
      //   });
    },
    deactivated() {
      this.allPost = [];
    },
    activated() {
      this.axios
        .get("http://localhost:3000/selectAllPost", {
          headers: {
            "Content-Type": "multipart/form-data",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let arr = response.data.reverse();
          let i;
          let j;
          for (i = 0; i < arr.length; i++) {
            for (j = i + 1; j < arr.length; j++) {
              if (arr[i].postId == arr[j].postId) {
                j = ++i;
              }
            }
            this.allPost.push(arr[i]);
          }
          // console.log(this.allPost);
          this.$storage.saveStorage("ALL_POST", this.allPost);
        });
      let dataTest = {
        value1: "a1",
        value2: "a2"
      };
      this.getUserThumbInfo();
      this.$storage.saveStorage("_TEST_", dataTest);
      this.$storage.saveStorage("THUMB_ARR", this.thumbArr);
      // this.mockAllPost2 = this.$store.state.mainPageStore.mockAllPost;
    },
    methods: {
      getUserThumbInfo() {
        let formData = new FormData();
        let _this = this;
        let user = {
          userId: _this.$store.state.loginPageStore.userInfo.userId
        };
        for (let key in user) {
          formData.append(key, user[key]);
        }
        this.axios
          .post("http://localhost:3000/getUserThumbInfo", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(response => {
            // console.log(typeof response.data);
            this.thumbArr = response.data;
            // console.log(this.thumbArr);
          });
      },
      likeRes: function(data) {
        let _this = this;
        switch (data) {
          case "1":
            _this.addCollectToast = true;
            _this.message = "点赞成功";
            break;
          case "2":
            _this.addCollectToast = true;
            // console.log(_this.addCollectToast);
            _this.message = "取消点赞成功";
            break;
          case "3":
            _this.addCollectToast = true;
            _this.message = "点赞失败";
            break;
          case "4":
            _this.addCollectToast = true;
            _this.message = "取消点赞失败";
            break;
        }
      },
      addCollectRes: function(data) {
        let _this = this;
        switch (data) {
          case "1":
            _this.addCollectToast = true;
            _this.message = "添加收藏成功";
            break;
          case "2":
            _this.addCollectToast = true;
            // console.log(_this.addCollectToast);
            _this.message = "取消收藏成功";
            break;
          case "3":
            _this.addCollectToast = true;
            _this.message = "添加收藏失败";
            break;
          case "4":
            _this.addCollectToast = true;
            _this.message = "取消收藏失败";
            break;
        }
      },
      turnToast: function() {
        this.addCollectToast = false;
        // this.$router.push({ name: "personalInfo" });
      },
      // goTest() {
      //   // console.log("this is test");
      //   return "@stm/masamisang2.jpg";
      // },
      showHoleText() {
        if (this.showPartText === true) {
          this.showPartText = false;
        } else {
          this.showPartText = true;
        }
        if (this.showAllText === false) {
          this.showAllText = true;
        } else {
          this.showAllText = false;
        }
      },
      like() {},
      goPicDetail(item) {
        // console.log(item);
        // this.$store.state.mainPageStore.item =
        this.$store.commit("mainPageStore/pushInToItem", item);
        this.$storage.saveStorage("_CHOICED_ITEM_", item);
        this.$router.push({
          name: "picDetail",
          params: {
            postId: item.postId
          }
        });
      },
      lookPic(path) {
        this.showLookPic = true;
        this.$store.state.mainPageStore.test = "222";
        this.$store.state.mainPageStore.lookPicPath = path;
        // console.log(this.$store.state.mainPageStore.lookPicPath);
        if (this.$store.state.mainPageStore.lookPicPath === path) {
          this.turnLookPic();
        }
      },
      turnLookPic() {
        this.$store.state.mainPageStore.showLookPic = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .latest {
    background-color: #e6e6e6;
    .vux-toast {
      position: fixed;
    }
    .latestMain {
      height: calc(100vh);
      overflow: scroll;
      .statesItem {
        background-color: #ffffff;
        margin-bottom: 0.2rem;
        .userInfo {
          padding-top: 0.1rem;
          display: flex;
          width: 100%;
          height: 0.92rem;
          // background-color: green;
          box-shadow: 0 0.1rem 0.2rem #e6e6e6;
          .userHeadImg {
            flex: 1.3;
            .headImg {
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 50%;
              margin-left: 0.16rem;
            }
            img {
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 50%;
              margin-left: 0.16rem;
            }
          }
          .userName {
            flex: 7;
            background-color: white;
            .name {
              font-size: 0.32rem;
              line-height: 0.4rem;
              height: 0.4rem;
            }
            .time {
              font-size: 0.16rem;
              line-height: 0.3rem;
              height: 0.3rem;
              color: #888888;
            }
          }
        }
        .statesText {
          width: 100%;
          height: 1.8rem;
          // background-color: gray;
          border-top: 0.1px solid #e6e6e6;
          overflow: hidden;
          .title {
            font-size: 0.4rem;
            color: #333;
            p {
              padding-top: 0.15rem;
              padding-left: 0.15rem;
            }
          }
          .text {
            font-size: 0.3rem;
            word-wrap: break-word;
            line-height: 0.35rem;
            padding: 0.2rem 0.15rem 0.05rem;
            .clickText {
              color: #333;
              font-size: 0.3rem;
            }
          }
        }
        .statesText2 {
          width: 100%;
          // height: 1.8rem;
          // background-color: gray;
          border-top: 0.1px solid #e6e6e6;
          overflow: hidden;
          .title {
            font-size: 0.4rem;
            color: #333;
            p {
              padding-top: 0.2rem;
              padding-left: 0.15rem;
            }
          }
          .text {
            font-size: 0.3rem;
            word-wrap: break-word;
            line-height: 0.35rem;
            padding: 0.2rem 0.15rem 0.05rem;
            .clickText {
              color: #333;
              font-size: 0.3rem;
            }
          }
        }
        .statesPhoto {
          margin-top: 0.07rem;
          width: 100%;
          height: 4.5rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .statesOptions {
          width: 100%;
          height: 0.65rem;
          line-height: 0.65rem;
          // background-color: blue;
          display: flex;
          border-bottom: 0.1px solid #e6e6e6;
          box-shadow: 0 0.1rem 0.2rem #e6e6e6;
          .like {
            flex: 1;
            padding: 0.06rem 0 0 0.1rem;
            img {
              height: 0.5rem;
            }
          }
          .comments {
            flex: 1;
            padding-top: 0.06rem;
            padding-left: 0.3rem;
            // margin-left: 0.4rem;
            img {
              height: 0.5rem;
            }
          }
          .collect {
            flex: 1;
            padding-top: 0.06rem;
            img {
              height: 0.5rem;
            }
          }
          .blank {
            flex: 6.5;
          }
        }
      }
    }
    .lookPicMain {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #000;
      .lookPicContent {
        background-color: #fff;
      }
    }
  }
</style>

