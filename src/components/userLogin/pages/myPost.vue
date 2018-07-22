<template>
  <div class="postMain">
    <headerBack :msg="'我发布的插画'"></headerBack>
    <div class="myPost">
      <ul>
        <li v-for="(item,index) in postList" :key="index">
          <!-- <getPostById :postId="item.postId"></getPostById> -->
          <div class="bodyMain" @click="goPicDetail(item)">
            <div class="top">
              {{item.postTitle}}
            </div>
            <div class="post">
              <img :src="item.post" alt="">
            </div>
            <div class="text">
              {{item.postText}}
            </div>
          </div>
          <div class="statesOptions">
            <div class="like">
              <userThumb :postId="item.postId"></userThumb>
            </div>
            <div class="comments">
              <img src="@a/comments.png" alt="" @click="goPicDetail(item)">
            </div>
            <div class="collect">
              <collect :postId="item.postId"></collect>
            </div>
            <div class="delete" style="font-size: 0.25rem;color:rgb(84,129,180);padding-top: 0.23rem;padding-left: 0.2rem;">
              <span @click="deleteConfirm(item.postId, index)">delete</span>
            </div>
            <div class="blank">
              <span>&nbsp;</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="deleteConfirm">
      <confirm v-model="showDeleteConfirm" @on-confirm="deletePost">{{'你确定要删除吗?'}}</confirm>
    </div>
    <toast v-model="deleteSuccess" width="5rem" position="middle" type="text" :time="1500">删除成功</toast>
  </div>
</template>

<script>
  import headerBack from "../../header/headerBack.vue";
  import getPostById from "../../common/getPostById.vue";
  import userThumb from "../../mainPage/component/thumb.vue";
  import collect from "../../mainPage/component/collect.vue";
  import { Confirm, Toast } from "vux";
  export default {
    data() {
      return {
        userId: this.$store.state.loginPageStore.userInfo.userId,
        postList: [],
        userHeadImg: this.$store.state.loginPageStore.userInfo.headImg,
        postId: "",
        showDeleteConfirm: false,
        index: "",
        deleteSuccess: false //删除成功标志
      };
    },
    components: {
      headerBack,
      getPostById,
      userThumb,
      collect,
      Confirm,
      Toast
    },
    activated() {
      this.getMyPost();
    },
    deactivated() {
      this.postList = [];
      this.deleteSuccess = false;
    },
    methods: {
      deletePost() {
        let _this = this;
        let formData = new FormData();
        let post = {
          postId: this.postId
        };
        for (let key in post) {
          formData.append(key, post[key]);
        }
        this.axios
          .post("http://localhost:3000/deletePost", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            // console.log(res);
            // this.getMyPost();
            _this.postList.splice(_this.index, 1);
            _this.deleteSuccess = true;
          });
      },
      deleteConfirm(postId, index) {
        this.postId = postId;
        this.showDeleteConfirm = true;
        this.index = index;
      },
      goPicDetail(item) {
        // console.log(item);
        this.$store.commit("mainPageStore/pushInToItem", item);
        this.$storage.saveStorage("_CHOICED_ITEM_", item);
        this.$router.push({
          name: "picDetail",
          params: {
            postId: item.postId
          }
        });
      },
      getMyPost() {
        let arr = this.$storage.loadStorage("MY_POST");
        this.postList = arr;
        // let formData = new FormData();
        // let _this = this;
        // let user = {
        //   userId: _this.userId
        // };
        // for (let key in user) {
        //   formData.append(key, user[key]);
        // }
        // this.axios
        //   .post("http://localhost:3000/getUserPost", formData, {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //       "Content-Type": "application/x-www-form-urlencoded"
        //     }
        //   })
        //   .then(function(response) {
        //     let arr = response.data;
        //     for (let key in arr) {
        //       _this.postList.push(arr[key]);
        //     }
        //     //   console.log(_this.postList);
        //   });
      }
    }
  };
</script>

<style lang="scss">
  .postMain {
    // height: calc(100vh - 1.2rem - 0.6rem);
    .myPost {
      padding-top: 0.6rem;
      li {
        .bodyMain {
          width: 100%;
          // text-align: center;
          .top {
            padding: 0.2rem;
            font-size: 0.4rem;
            color: #333;
          }
          .post {
            img {
              padding: 0 5%;
              width: 90%;
              height: 4.5rem;
            }
          }
          .text {
            font-size: 0.3rem;
            color: #333;
          }
        }
        .statesOptions {
          width: 100%;
          height: 0.65rem;
          line-height: 0.2rem;
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
  }
</style>
