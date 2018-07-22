<template>
  <div class="headImg">
    <ul>
      <li v-for="(item, index) in headImgPath" :key="index" @click="goUserDetail">
        <img :src="item.headImg" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: [],
        headImgPath: []
      };
    },
    props: ["headIndex"],
    created() {
      // console.log(this.headIndex);
      // console.log(typeof this.headIndex);
      this.$storage.saveStorage("_HEAD_INDEX_", this.headIndex);
      this.getUserInfoById(this.headIndex);
    },
    methods: {
      goUserDetail() {
        // console.log(this.userInfo);
        this.$storage.saveStorage("_USER_INFO_FROM_HEADIMG_", this.headImgPath);
        // console.log(this.$storage.loadStorage("_USER_INFO_FROM_HEADIMG_"));
        // console.log("aaa");
        this.$router.push({ name: "userDetail" });
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
            _this.userInfo = response.data;
            _this.headImgPath.push(response.data[0]);
          });
      }
    }
  };
</script>

<style lang="scss">
  .headImg {
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      margin-left: 0rem;
    }
  }
</style>
