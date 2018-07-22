<template>
  <div class="userMain">
    <headerBack :msg="title"></headerBack>
    <div class="listMain">
      <ul>
        <li v-for="(item, index) in userList" :key="index" @click="goUserUserDetail(item)">
          <div class="headImg">
            <img :src="item.headImg" alt="">
          </div>
          <div class="userInfo">
            <div class="userName">{{item.userName}}</div>
            <div class="userIntroduction">{{ getUserIntroduction(item.userIntroduction) }}</div>
          </div>
        </li>
      </ul>
    </div>
    <divider style="font-size: 0.27rem;color: #c4c4c4;padding-top:0.4rem;">没有更多数据啦~</divider>
  </div>
</template>

<script>
  import headerBack from "../../header/headerBack.vue";
  import { Divider } from "vux";
  export default {
    data() {
      return {
        followFlag: "",
        userList: [],
        title: ""
      };
    },
    components: {
      headerBack,
      Divider
    },
    created() {},
    activated() {
      this.followFlag = this.$storage.loadStorage("FOLLOW_FLAG");
      let arr;
      if (this.followFlag == "1") {
        //我关注的
        this.title = "我关注的用户";
        arr = this.$storage.loadStorage("ME_FOLLOW");
        for (let key in arr) {
          this.getUserInfo(arr[key].beFollowedUserId);
        }
      } else if (this.followFlag == "2") {
        //关注我的
        this.title = "关注我的用户";
        arr = this.$storage.loadStorage("FOLLOW_ME");
        for (let key in arr) {
          this.getUserInfo(arr[key].userId);
        }
      }
    },
    deactivated() {
      this.userList = [];
    },
    methods: {
      goUserUserDetail(item) {
        let arr3 = [item];
        this.$storage.saveStorage("_USER_INFO_FROM_HEADIMG_", arr3);
        this.$router.push({ name: "userDetail" });
      },
      getUserInfo(beFollowedUserId) {
        let formData = new FormData();
        let _this = this;
        let user = {
          userId: beFollowedUserId
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
            let arr = response.data;
            //   _this.userList = arr;
            // console.log(response.data[0]);
            _this.userList.push(arr[0]);
            // console.log(_this.userList);
          });
      },
      getUserIntroduction(intro) {
        if (intro.length === 0) {
          return "这个用户很懒，什么都没写哦~";
        } else {
          return intro;
        }
        // console.log(intro.length);
      }
    }
  };
</script>

<style lang="scss">
  .userMain {
    .listMain {
      padding-top: 0.65rem;
      li {
        //   background-color: pink;
        border-bottom: 0.05rem solid lightgray;
        display: flex;
        height: 1rem;
        padding-top: 0.2rem;
        border-bottom: 0.01rem solid #e6e6e6;
        font-size: 0.4rem;
        .headImg {
          flex: 1;
          img {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            margin-left: 0.16rem;
          }
        }
        .userInfo {
          flex: 5.5;
          .userName {
            height: 0.4rem;
          }
          .userIntroduction {
            height: 0.4rem;
            padding-top: 0.1rem;
            max-width: 6rem;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.3rem;
          }
        }
      }
    }
  }
</style>
