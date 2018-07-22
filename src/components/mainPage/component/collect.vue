<template>
  <div class="collectMain">
    <div class="notCollect" @click="judgeLogin" v-show="userCollected == false">
      <img src="@a/fav.png" />
    </div>
    <div class="collected" @click="judgeLogin" v-show="userCollected == true">
      <img src="@a/fav_fill.png" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userCollected: false
      };
    },
    props: ["postId"],
    created() {
      this.getUserCollect();
    },
    activated() {
      this.getUserCollect();
    },
    methods: {
      getUserCollect() {
        if (
          this.$store.state.loginPageStore.userInfo.userId == "" ||
          this.$store.state.loginPageStore.userInfo.userId == undefined ||
          this.$store.state.loginPageStore.userInfo.userId.length == 0
        ) {
          this.userCollected = false;
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
            .post("http://localhost:3000/getCollectInfo", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(function(response) {
              let arr = response.data;
              for (let key in arr) {
                if (
                  arr[key].userId ==
                  _this.$store.state.loginPageStore.userInfo.userId
                ) {
                  if (arr[key].postId == _this.postId) {
                    _this.userCollected = true;
                  }
                } else {
                  return;
                }
              }
            });
        }
      },
      judgeLogin() {
        if (
          this.$store.state.loginPageStore.userInfo.userId == "" ||
          this.$store.state.loginPageStore.userInfo.userId == undefined ||
          this.$store.state.loginPageStore.userInfo.userId.length == 0
        ) {
          this.$router.push({ name: "login" });
        } else {
          this.addCollect();
        }
      },
      addCollect() {
        let _this = this;
        let formData = new FormData();
        let user = {
          userId: _this.$store.state.loginPageStore.userInfo.userId,
          postId: _this.postId
        };
        for (let key in user) {
          formData.append(key, user[key]);
        }
        if (this.userCollected == false) {
          this.axios
            .post("http://localhost:3000/userAddCollect", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(function(response) {
              if (response.data !== "") {
                _this.userCollected = true;
                let res = "1";
                _this.addCollectRes(res);
              } else {
                let res = "3";
                _this.addCollectRes(res);
              }
            });
        } else {
          this.axios
            .post("http://localhost:3000/deleteAddCollect", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(function(response) {
              if (response.data !== "") {
                _this.userCollected = false;
                let res = "2";
                _this.addCollectRes(res);
              } else {
                let res = "4";
                _this.addCollectRes(res);
              }
            });
        }
      },
      addCollectRes(res) {
        //flag为1时，添加收藏成功，
        //flag为2时，取消收藏成功，
        //flag为3时，添加收藏失败，
        //flag为3时，取消收藏失败
        let addCollectResFlag;
        let _this = this;
        switch (res) {
          case "1":
            addCollectResFlag = "1";
            _this.$emit("getAddCollectRes", addCollectResFlag);
            break;
          case "2":
            addCollectResFlag = "2";
            _this.$emit("getAddCollectRes", addCollectResFlag);
            break;
          case "3":
            addCollectResFlag = "3";
            _this.$emit("getAddCollectRes", addCollectResFlag);
            break;
          case "4":
            addCollectResFlag = "4";
            _this.$emit("getAddCollectRes", addCollectResFlag);
            break;
        }
      }
    }
  };
</script>

<style lang="scss">
  .collectMain {
    .notCollect {
      img {
        height: 0.5rem;
        padding-bottom: 0.5rem;
      }
    }
    .collected {
      img {
        height: 0.5rem;
        padding-bottom: 0.5rem;
      }
    }
  }
</style>
