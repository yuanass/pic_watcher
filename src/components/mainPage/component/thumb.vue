<template>
  <div class="likeMain">
    <div class="notLike" @click="judgeLogin" v-show="userThumbed === false">
      <img src="@a/like.png" />
      <span class="num">{{this.thumbNum}}</span>
    </div>
    <div class="liked" @click="judgeLogin" v-show="userThumbed === true">
      <img src="@a/like_fill.png" />
      <span class="num">{{this.thumbNum}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userThumbed: false,
        thumbNum: 0,
        arr2: "",
        thumbArr: []
      };
    },
    props: ["postId"],
    // computed: {
    //   thumb() {
    //     let { thumcNum } = this;
    //     return {
    //       thumb
    //     };
    //   }
    // },
    // watch: {
    //   thumbNum: {
    //     handler() {
    //       return this.thumbNum;
    //     }
    //   }
    // },
    created() {
      this.getThumbNum();
      this.getUserThumb();
    },
    activated() {
      this.getThumbNum();
      this.getUserThumb();
      // console.log(this.postId);
    },
    methods: {
      getThumbNum() {
        let formData = new FormData();
        let _this = this;
        let post = {
          postId: _this.postId
        };
        for (let key in post) {
          formData.append(key, post[key]);
        }
        this.axios
          .post("http://localhost:3000/getThumbNum", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(function(response) {
            // console.log(response.data);
            if (response.data.length === 0) {
              _this.thumbNum = 0;
            } else {
              _this.thumbNum = response.data[0].thumbNum;
            }
          });
        // this.thumbArr = this.$storage.loadStorage("THUMB_ARR");
        // let arr = this.thumbArr;
        // let _this = this;
        // let userId = this.$store.state.loginPageStore.userInfo.userId;
        // for (let key in arr) {
        //   if (arr[key].userId == userId && arr[key].postId == this.postId) {
        //     _this.thumbNum = arr[key].thumbNum;
        //   }
        // }
      },
      judgeLogin() {
        if (
          this.$store.state.loginPageStore.userInfo.userId === "" ||
          this.$store.state.loginPageStore.userInfo.userId === undefined ||
          this.$store.state.loginPageStore.userInfo.userId.length === 0
        ) {
          this.$router.push({ name: "login" });
        } else {
          this.userThumb();
        }
      },
      userThumb() {
        let _this = this;
        let formData = new FormData();
        let thumbTmp = this.thumbNum;
        thumbTmp += 1;
        let user = {
          userId: _this.$store.state.loginPageStore.userInfo.userId,
          postId: _this.postId,
          thumbNum: thumbTmp
        };
        for (let key in user) {
          formData.append(key, user[key]);
        }
        // console.log(user);
        if (this.userThumbed === false) {
          this.axios
            .post("http://localhost:3000/userThumb", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(function(response) {
              _this.thumbNum += 1;
              _this.userThumbed = true;
              // if (response.data !== "") {
              //   _this.thumbNum += 1;
              //   // _this.userliked = true;
              //   // let res = "1";
              //   // _this.likeRes(res);
              // } else {
              //   // let res = "3";
              //   // _this.likeRes(res);
              // }
              _this.updateThumb(_this.thumbNum);
            });
        } else {
          let _this = this;
          let formData = new FormData();
          let thumbTmp = this.thumbNum;
          thumbTmp -= 1;
          let user = {
            userId: _this.$store.state.loginPageStore.userInfo.userId,
            postId: _this.postId,
            thumbNum: thumbTmp
          };
          for (let key in user) {
            formData.append(key, user[key]);
          }
          this.axios
            .post("http://localhost:3000/userDisThumb", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(function(response) {
              _this.thumbNum -= 1;
              _this.userThumbed = false;
              _this.updateThumb(_this.thumbNum);
            });
        }
      },
      updateThumb(thumbNum) {
        let _this = this;
        let formData = new FormData();
        let info = {
          postId: _this.postId,
          thumbNum: thumbNum
        };
        for (let key in info) {
          formData.append(key, info[key]);
        }
        this.axios
          .post("http://localhost:3000/updateThumb", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            // console.log(res);
          });
      },
      getUserThumb() {
        if (
          this.$store.state.loginPageStore.userInfo.userId === "" ||
          this.$store.state.loginPageStore.userInfo.userId === undefined ||
          this.$store.state.loginPageStore.userInfo.userId.length === 0
        ) {
          this.userThumbed = false;
        } else {
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
            .then(function(response) {
              let arr = response.data;
              for (let key in arr) {
                if (
                  arr[key].userId ===
                  _this.$store.state.loginPageStore.userInfo.userId
                ) {
                  if (arr[key].postId == _this.postId) {
                    _this.userThumbed = true;
                    break;
                  } else {
                    _this.userThumbed = false;
                  }
                } else {
                  // if (arr[key].postId === _this.postId) {
                  //   _this.userThumbed = false;
                  //   // _this.arr2 = arr;
                  //   // _this.thumbNum = _this.arr2[0].thumbNum;
                  // } else {
                  //   _this.userThumbed = true;
                  // }
                  return;
                }
              }
            });
        }
      }
    }
  };
</script>

<style lang="scss">
  .likeMain {
    .notLike {
      border: 0.01rem solid #c4c4c4;
      border-radius: 20%;
      display: flex;
      img {
        flex: 1;
        height: 0.5rem;
      }
      .num {
        flex: 1;
        font-size: 0.3rem;
        height: 0.5rem;
        line-height: 0.5rem;
        width: 0.5rem;
        // float: right;
        // background-color: gray;
        padding-right: 0.1rem;
        text-align: right;
      }
    }
    .liked {
      border: 0.01rem solid #c4c4c4;
      border-radius: 13%;
      display: flex;
      img {
        flex: 1;
        height: 0.5rem;
      }
      .num {
        flex: 1;
        font-size: 0.3rem;
        height: 0.5rem;
        line-height: 0.5rem;
        width: 0.5rem;
        // float: right;
        // background-color: gray;
        padding-right: 0.1rem;
        text-align: right;
      }
    }
  }
</style>
