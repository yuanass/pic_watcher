<template>
  <div class="collectMain">
    <!-- <div>this is user Collect {{this.userId}}</div> -->
    <!-- <div class="">我收藏的插画：</div> -->
    <headerBack :msg="'我的收藏夹'"></headerBack>
    <div class="myCollect">
      <ul>
        <li v-for="(item,index) in collectList" :key="index">
          <getPostById :postId="item.postId"></getPostById>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import headerBack from "../../header/headerBack.vue";
  import getPostById from "../../common/getPostById.vue";
  export default {
    data() {
      return {
        userId: this.$store.state.loginPageStore.userInfo.userId,
        collectList: []
      };
    },
    components: {
      headerBack,
      getPostById
    },
    //   props: ["userId"],
    activated() {
      this.getUserCollect();
    },
    deactivated() {
      this.collectList = [];
    },
    methods: {
      getUserCollect() {
        let formData = new FormData();
        let _this = this;
        let user = {
          userId: _this.userId
        };
        for (let key in user) {
          formData.append(key, user[key]);
        }
        this.axios
          .post("http://localhost:3000/getUserCollect", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(function(response) {
            let arr = response.data;
            for (let key in arr) {
              _this.collectList.push(arr[key]);
            }
            // console.log(_this.collectList);
          });
      }
    }
  };
</script>

<style lang="scss">
  .collectMain {
    height: calc(100vh);
    .myCollect {
      padding-top: 0.6rem;
    }
  }
</style>
