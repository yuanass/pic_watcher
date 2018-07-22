<template>
  <div class="postMain">
    <div class="postItem">
      <ul>
        <li v-for="(item, index) in postList" :key="index">
          <div class="userInfo">
            <div class="userHeadImg">
              <!-- <img src="@stm/masamisang2.jpg" alt=""> -->
              <headImg class="headImg" :headIndex="item.userId"></headImg>
            </div>
            <div class="userName">
              <div class="name">{{item.userName}}</div>
              <div class="time">{{item.postDate}}</div>
            </div>
          </div>
          <div class="statesText">
            <div class="title">
              <p>{{item.postTitle}}</p>
            </div>
            <div class="text">
              <p>{{item.postText}}
              </p>
            </div>
          </div>
          <div class="statesPhoto">
            <img :src="item.post" alt="" @click="lookPic(item.post)">
          </div>
          <!-- <span class="clickText" @click="showHoleText" value="click" style="font-size:0.3rem;">clickA</span>
                    <div class="statesText2" v-show="showAllText === true">
                        <div class="title">
                            <p>{{item.postTitle}}</p>
                        </div>
                        <div class="text">
                            <p>{{item.postText}}
                            </p>
                            <span class="clickText" @click="showHoleText" value="click">click</span>
                        </div>
                    </div>
                     -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import headImg from "../common/headImg.vue";
  export default {
    data() {
      return {
        postList: []
      };
    },
    components: {
      headImg
    },
    props: ["postId"],
    created() {
      this.getPost();
    },
    methods: {
      getPost() {
        let formData = new FormData();
        let _this = this;
        let post = {
          postId: this.postId
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
      }
    }
  };
</script>

<style lang="scss">
  .postMain {
    //   height: calc(100vh);
    //   margin-top: 0.3rem;
    .postItem {
      border-top: 0.01rem solid #e6e6e6;
      margin-top: 0.15rem;
      box-shadow: 0 -0.1rem 0.2rem #e6e6e6;
      .userInfo {
        padding-top: 0.1rem;
        display: flex;
        width: 100%;
        height: 0.92rem;
        // background-color: green;
        box-shadow: 0 0.1rem 0.2rem #e6e6e6;
        .userHeadImg {
          flex: 1.3;
          .headImg {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            margin-left: 0.16rem;
          }
          img {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            margin-bottom: 0.1rem;
          }
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
      .statesText {
        width: 100%;
        //   height: 1.8rem;
        // background-color: gray;
        border-top: 0.1px solid #e6e6e6;
        overflow: hidden;
        .title {
          font-size: 0.4rem;
          color: #333;
          p {
            padding-top: 0.2rem;
            padding-left: 0.15rem;
          }
        }
        .text {
          font-size: 0.3rem;
          word-wrap: break-word;
          padding: 0.2rem 0.15rem 0.05rem;
          .clickText {
            color: #333;
            font-size: 0.3rem;
          }
        }
      }
      .statesPhoto {
        margin-top: 0.07rem;
        width: 100%;
        height: 4.5rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
