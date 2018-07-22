<template>
  <div class="comment">
    <!-- <div>{{this.postId}}</div> -->
    <div class="commentItem">
      <ul>
        <li v-for="(item, index) in commentList" :key="index">
          <div class="item">
            <div class="commenterHeadImg">
              <img :src="item.headImg" alt="" @click="goUserDetail(item.userId)">
              <!-- <headImg :userId="item.userId"></headImg> -->
            </div>
            <div class="commentName">
              {{item.userName}}
            </div>
            <div class="commentTime">
              {{item.commentDate}}
            </div>
          </div>
          <div class="commentText">
            {{item.commentDetail}}
          </div>
        </li>
      </ul>
    </div>
    <div class="addComment">
      <x-input class="addCommentInput" placeholder="请输入评论" type="text" :show-clear="false"
        v-model="commentContent" @on-focus="judgeLogin">
        <x-button slot="right" class="addCommentBtn" text="发表评论" @click.native="addComment"></x-button>
      </x-input>
    </div>
  </div>
</template>

<script>
  import { XInput, XButton } from "vux";
  import headImg from "../../common/headImg.vue";
  export default {
    data() {
      return {
        commentList: [],
        commentContent: "",
        userInfo: {},
        postIds: ""
      };
    },
    components: {
      XInput,
      XButton,
      headImg
    },
    props: ["postId"],
    created() {
      this.postIds = this.postId;
      let formData = new FormData();
      let _this = this;
      let post = {
        postId: this.postId
      };
      for (let key in post) {
        formData.append(key, post[key]);
      }
      this.axios
        .post("http://localhost:3000/getCommentByPostId", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(function(response) {
          let arr = response.data;
          // let arr;
          for (let i = 0; i < arr.length; i++) {
            _this.commentList.push(arr[i]);
          }
        });
    },
    methods: {
      goUserDetail(id) {
        this.$router.push({ name: "userDetail" });
      },
      addComment() {
        let _this = this;
        if (this.$store.state.loginPageStore.userInfo.userId !== undefined) {
          this.userInfo = this.$store.state.loginPageStore.userInfo;
          if (
            this.commentContent === "" ||
            this.commentContent.length === 0 ||
            this.commentContent === null
          ) {
            alert("不能为空");
          } else {
            // console.log(this.commentContent);
            // let date;
            let date = _this.getDate();
            let info = {
              postId: this.postId,
              userId: this.userInfo.userId,
              userName: this.userInfo.userName,
              headImg: this.userInfo.headImg,
              commentDetail: this.commentContent,
              commentDate: date
            };
            let formData = new FormData();
            for (let key in info) {
              formData.append(key, info[key]);
            }
            this.commentList.push(info);
            this.axios
              .post("http://localhost:3000/addComment", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              })
              .then(function(response) {
                if (response) {
                  // console.log(response);
                  // _this.addCommentToast = true;
                  //messageFlag: 1为成功，2为失败
                  let messageFlag;
                  messageFlag = "1";
                  _this.$emit("getAddCommentRes", messageFlag);
                  _this.commentContent = "";
                }
              });
          }
        } else {
          // console.log("null");
          this.$router.push({ name: "login" });
          // this.$storage.push("111", "222");
        }

        // this.userInfo = this.$store.state.loginPageStore.userInfo;
      },
      getDate() {
        // var date = new Date();
        // var seperator1 = "-";
        // var year = date.getFullYear();
        // var month = date.getMonth() + 1;
        // var strDate = date.getDate();
        // if (month >= 1 && month <= 9) {
        //   month = "0" + month;
        // }
        // if (strDate >= 0 && strDate <= 9) {
        //   strDate = "0" + strDate;
        // }
        // var currentdate = year + seperator1 + month + seperator1 + strDate;
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var minute = date.getMinutes();
        var hour = date.getHours();
        var second = date.getSeconds();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        if (minute >= 0 && minute <= 9) {
          minute = "0" + minute;
        }
        if (hour >= 0 && hour <= 9) {
          hour = "0" + hour;
        }
        if (second >= 0 && second <= 9) {
          second = "0" + second;
        }
        var currentdate =
          date.getFullYear() +
          seperator1 +
          month +
          seperator1 +
          strDate +
          " " +
          hour +
          seperator2 +
          minute +
          seperator2 +
          second;
        return currentdate;
      },
      judgeLogin() {
        if (this.$store.state.loginPageStore.userInfo.userId === undefined) {
          this.$router.push({ name: "login" });
        } else {
          return;
        }
      }
    }
  };
</script>

<style lang="scss">
  .comment {
    // background-color: #e5e5e5;
    width: 100%;
    // height: calc(100vh - 0.4rem);
    // height: 100vh;
    // padding-bottom: 1rem;
    .commentItem {
      // height: 0.8rem;
      .item {
        border-top: 1px solid #e5e5e5;
        padding-top: 0.1rem;
        display: flex;
        height: 0.6rem;
        .commenterHeadImg {
          flex: 1;
          img {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            // margin-left: 0rem;
            margin-left: 0.3rem;
            margin-bottom: 0.3rem;
          }
        }
        .commentName {
          flex: 6;
          font-size: 0.4rem;
          line-height: 0.5rem;
          padding-left: 0.18rem;
        }
        .commentTime {
          font-size: 0.2rem;
          padding-top: 0.18rem;
          padding-right: 2rem;
        }
      }
      .commentText {
        font-size: 0.35rem;
        padding: 0 0.5rem 0.1rem 0.4rem;
        border-bottom: 1px solid #e5e5e5;
      }
    }
    .addComment {
      .addCommentInput {
        width: 100%;
        height: 0.4rem;
        font-size: 0.35rem;
        position: fixed;
        bottom: 0;
        border-top: 0.03rem solid #eeeeee;
        background-color: white;
        z-index: 100;
        .addCommentBtn {
          height: 0.7rem;
          line-height: 0.7rem;
          font-size: 0.3rem;
          color: white;
          background-color: rgb(084, 129, 180);
          text-align: center;
          width: 2rem;
          padding-left: 0.05rem;
        }
      }
    }
  }
</style>
