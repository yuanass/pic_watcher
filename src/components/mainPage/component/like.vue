<template>
  <div class="likeMain">
    <div class="notLike" @click="judgeLogin" v-show="userliked === false">
      <img src="@a/follow.png" />
    </div>
    <div class="liked" @click="judgeLogin" v-show="userliked === true">
      <img src="@a/followed.png" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userliked: false
      };
    },
    props: ["postId"],
    created() {
      this.getUserLike();
    },
    activated() {
      this.getUserLike();
    },
    methods: {
      userLike() {
        let _this = this;
        let formData = new FormData();
        let user = {
          userId: _this.$store.state.loginPageStore.userInfo.userId,
          postId: _this.postId
        };
        for (let key in user) {
          formData.append(key, user[key]);
        }
        if (this.userliked === false) {
          this.axios
            .post("http://localhost:3000/userLike", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(function(response) {
              if (response.data !== "") {
                _this.userliked = true;
                let res = "1";
                _this.likeRes(res);
              } else {
                let res = "3";
                _this.likeRes(res);
              }
            });
        } else {
          // console.log(_this.userCollected);
          this.axios
            .post("http://localhost:3000/deleteUserLike", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(function(response) {
              // console.log(response.data);
              if (response.data !== "") {
                _this.userliked = false;
                let res = "2";
                _this.likeRes(res);
              } else {
                let res = "4";
                _this.likeRes(res);
              }
            });
        }
      },
      judgeLogin() {
        if (
          this.$store.state.loginPageStore.userInfo.userId === "" ||
          this.$store.state.loginPageStore.userInfo.userId === undefined ||
          this.$store.state.loginPageStore.userInfo.userId.length === 0
        ) {
          this.$router.push({ name: "login" });
        } else {
          this.userLike();
        }
      },
      getUserLike() {
        if (
          this.$store.state.loginPageStore.userInfo.userId === "" ||
          this.$store.state.loginPageStore.userInfo.userId === undefined ||
          this.$store.state.loginPageStore.userInfo.userId.length === 0
        ) {
          this.userliked = false;
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
            .post("http://localhost:3000/getUserLikeInfo", formData, {
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
                  if (arr[key].postId === _this.postId) {
                    _this.userliked = true;
                  }
                } else {
                  return;
                }
              }
            });
        }
      },
      likeRes(res) {
        //flag为1时，添加收藏成功，
        //flag为2时，取消收藏成功，
        //flag为3时，添加收藏失败，
        //flag为3时，取消收藏失败
        let likeResFlag;
        let _this = this;
        switch (res) {
          case "1":
            likeResFlag = "1";
            _this.$emit("getLikeRes", likeResFlag);
            break;
          case "2":
            likeResFlag = "2";
            _this.$emit("getLikeRes", likeResFlag);
            break;
          case "3":
            likeResFlag = "3";
            _this.$emit("getLikeRes", likeResFlag);
            break;
          case "4":
            likeResFlag = "4";
            _this.$emit("getLikeRes", likeResFlag);
            break;
        }
      }
    }
  };
</script>

<style lang="scss">
  .likeMain {
    .notLike {
      img {
        height: 0.5rem;
      }
    }
    .liked {
      img {
        height: 0.5rem;
      }
    }
  }
</style>
