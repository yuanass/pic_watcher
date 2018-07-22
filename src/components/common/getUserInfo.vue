<template>
  <div class="userInfo">
    <div class="userItem">
      <!-- <img src="@stm/masamisang2.jpg" alt=""> -->
      <ul>
        <li class="item" v-for="(item, index) in this.detail" :key="index">
          <!-- <headImg class="headImg" :headIndex="item.userId"></headImg> -->
          <div class="headImg">
            <img :src="item.headImg" alt="" width="50">
          </div>
          <div class="userInfoLittle">
            <div class="userName">{{item.userName}}</div>
            <!-- <div class="userIntroduction">{{ getUserIntroduction(item.userIntroduction) }}</div> -->
            <div class="userIntroduction">{{ item.userIntroduction }}</div>
            <!-- <div class="postDate">{{item.postData}}</div> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detail: [],
        userId: "",
        postId: ""
      };
    },
    props: ["userIdGUI"],
    created() {
      // console.log(this.userIdGUI);
      // this.getUserId();
      this.getUserInfoById();
    },
    methods: {
      getUserId() {
        // let dataTest = this.$storage.loadStorage("_CHOICED_ITEM_");
        // let postData = this.$storage.loadStorage("_POST_DATA_");
        // this.postId = postData.postId;
        // this.userId = postData.userId;
        // this.detail.push(dataTest);
        // alert(dataTest.userId);
        // this.userId = dataTest.userId;
        return this.userId;
      },
      getUserInfoById() {
        let formData = new FormData();
        let _this = this;
        let user = {
          userId: this.userIdGUI
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
            // console.log(response.data[0]);
            _this.detail.push(response.data[0]);
          });
      }
    }
  };
</script>

<style lang="scss">
  .userInfo {
    .userItem {
      box-shadow: 0 -0.1rem 0.2rem #e6e6e6;
      .item {
        display: flex;
        height: 1rem;
        // padding-top: 0.2rem;
        border-bottom: 0.01rem solid #e6e6e6;
        box-shadow: 0 0.1rem 0.2rem #e6e6e6;
        padding-top: 0.16rem;
        // box-shadow: 0 -0.1rem 0.2rem #e6e6e6;
        .headImg {
          flex: 1;
          img {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            margin-left: 0.16rem;
          }
        }
        .userInfoLittle {
          flex: 5.5;
          .userName {
            height: 0.4rem;
          }
        }
      }
    }
  }
</style>
