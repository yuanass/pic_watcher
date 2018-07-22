<template>
  <div>
    <headerBack :msg="'详细信息'"></headerBack>
    <div class="picDetail">
      <div class="userInfo">
        <ul>
          <li v-for="(item, index) in this.detail" :key="index">
            <!-- <headImg class="headImg" :headIndex="item.userId"></headImg> -->
            <div class="userHeadImg">
              <headImg class="headImg" :headIndex="item.userId"></headImg>
            </div>
            <div class="userName">
              <div class="name">{{item.userName}}</div>
              <div class="time">{{item.postDate}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="picDetailMain">
        <ul>
          <li v-for="(item, index) in detail" :key="index">
            <div class="statesTitle">
              <p>{{item.postTitle}}</p>
            </div>
            <div class="statesText">
              <div class="text">
                <p>{{item.postText}}
                </p>
              </div>
            </div>
          </li>
        </ul>
        <div class="statesPhoto" v-for="(item, index) in postList" :key="index">
          <img :src="item.post" alt="">
        </div>
        <!-- <getPostById :postId="pid"></getPostById> -->
      </div>
      <div class="a">
        <ul>
          <li v-for="(item, index) in detail" :key="index">
            <div class="options">
              <div class="com">评论区：</div>
              <div class="thumb">
                <thumb :postId="item.postId"></thumb>
              </div>
              <div class="collect">
                <collect :postId="item.postId"></collect>
              </div>
            </div>
            <!-- <div style="font-size: 0.3rem;padding-bottom:0.15rem;"></div> -->
            <comment :postId="item.postId" v-on:getAddCommentRes="showAddCommentRes"></comment>
          </li>
        </ul>
      </div>
      <toast v-model="addCommentToast" width="5rem" position="middle" type="text" :time="this.toastTime"
        @on-hide="turnToast">{{this.message}}</toast>
    </div>
  </div>
</template>

<script>
  import headerBack from "../../header/headerBack.vue";
  import { XDialog, Toast } from "vux";
  import headImg from "../../common/headImg.vue";
  import comment from "../component/comment.vue";
  import getPostById from "../../common/getPostById.vue";
  import thumb from "../../mainPage/component/thumb.vue";
  import collect from "../../mainPage/component/collect.vue";

  export default {
    data() {
      return {
        detail: [],
        userId: "",
        userInfo: [],
        toastTime: 1500,
        message: "",
        addCommentToast: false,
        pid: "",
        postList: []
      };
    },
    components: {
      headerBack,
      XDialog,
      headImg,
      comment,
      Toast,
      getPostById,
      thumb,
      collect
    },
    activated() {
      // this.getUserInfoById();
      let dataTest = this.$storage.loadStorage("_CHOICED_ITEM_");
      // this.pid = this.$route.params.postId;
      this.pid = dataTest.postId;
      this.getPostList();
      this.detail.push(dataTest);
    },
    deactivated() {
      this.detail = [];
      this.userId = "";
      this.postList = [];
    },
    methods: {
      getPostList() {
        let formData = new FormData();
        let _this = this;
        let post = {
          postId: this.pid
        };
        for (let key in post) {
          formData.append(key, post[key]);
        }
        this.axios
          .post("http://localhost:3000/getPostById", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(function(response) {
            let arr = response.data;
            for (let key in arr) {
              _this.postList.push(arr[key]);
            }
          });
      },
      getUserId() {
        let dataTest = this.$storage.loadStorage("_CHOICED_ITEM_");
        // this.postId = dataTest.postId;
        this.detail.push(dataTest);
        // alert(dataTest.userId);
        this.userId = dataTest.userId;
        return this.userId;
      },
      // getUserInfoById() {
      //   let formData = new FormData();
      //   let _this = this;
      //   let user = {
      //     userId: this.userId
      //   };
      //   for (let key in user) {
      //     formData.append(key, user[key]);
      //   }
      //   this.axios
      //     .post("http://localhost:3000/getUserById", formData, {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //         "Content-Type": "application/x-www-form-urlencoded"
      //       }
      //     })
      //     .then(function(response) {
      //       // console.log(response.data);
      //       // this.userInfo.push(response.data);
      //     });
      // },
      showAddCommentRes: function(data) {
        let _this = this;
        if (data === "1") {
          _this.addCommentToast = true;
          _this.message = "添加评论成功！";
        } else if (data === "2") {
          _this.addCommentToast = true;
          _this.message = "添加评论失败！";
        }
      },
      turnToast: function() {
        this.addCommentToast = false;
        // this.$router.push({ name: "personalInfo" });
      }
    }
  };
</script>

<style lang="scss">
  .picDetail {
    // padding-top: 0.6rem;
    .userInfo {
      padding-top: 0.7rem;
      width: 100%;
      height: 0.9rem;
      // background-color: green;
      box-shadow: 0 0.1rem 0.2rem #e6e6e6;
      li {
        // padding-top: 0.1rem;
        display: flex;
        .userHeadImg {
          flex: 1.3;
          .headImg {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            margin-left: 0.16rem;
          }
          // img {
          //   width: 0.8rem;
          //   height: 0.8rem;
          //   border-radius: 50%;
          //   margin-left: 0.16rem;
          // }
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
    }
    .picDetailMain {
      padding-top: 0.2rem;
      .statesTitle {
        font-size: 0.5rem;
      }
      .picDetailTop {
        width: 100%;
        font-size: 0.4rem;
        .userName {
          .name {
            font-size: 0.4rem;
          }
          .time {
            font-size: 0.3rem;
          }
        }
      }
      .statesText {
        padding-left: 0.2rem;
        .text {
          font-size: 0.35rem;
        }
      }
      .statesPhoto {
        margin-top: 0.2rem;
        img {
          width: 100%;
          height: 4.5rem;
        }
      }
    }
    .a {
      .options {
        width: 100%;
        height: 0.6rem;
        display: flex;
        // text-align: center;
        .thumb {
          flex: 1;
          .notLike {
            width: 50%;
          }
          .liked {
            width: 50%;
          }
        }
        .collect {
          // padding-bottom: 0.5rem;
          // align-items: center;
          flex: 1;
          img {
            margin-bottom: 0.5rem;
          }
        }
        .com {
          flex: 1;
          font-size: 0.3rem;
          padding: 0.1rem 0 0;
          margin-left: 0.2rem;
          // padding-bottom: 0.15rem;
        }
      }
    }
  }
</style>
