<template>
  <div class="searchResult">
    <headerBack :msg="'搜索结果'"></headerBack>
    <div class="searchTitle">
      <div class="font">搜索"{{ this.searchInput }}"的结果</div>
    </div>
    <div class="resultMain">
      <div class="resultUser">
        <div class="title">用户：</div>
        <div class="main">
          <div class="noResult" v-if="this.showSearchUserResult === false">
            <span>抱歉，没有搜索到相关的用户哦！</span>
          </div>
          <div class="haveResult" v-if="this.showSearchUserResult === true">
            <ul>
              <li class="haveResultItem" v-for="(item, index) in this.searchUserResult" :key="index">
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
        </div>
      </div>
      <div class="resultPost">
        <div class="title">插画：</div>
        <div class="main">
          <div class="noResult" v-if="this.showSearchPostResult === false">
            <span>抱歉，没有搜索到相关的插画哦！</span>
          </div>
          <div class="haveResult" v-if="this.showSearchPostResult === true">
            <ul>
              <li class="haveResultItem" v-for="(item, index) in this.searchPostResult" :key="index">
                <getUserInfo :userIdGUI="item.userId"></getUserInfo>
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
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <divider style="font-size: 0.27rem;color: #c4c4c4;">已经到底啦~</divider>
  </div>
</template>

<script>
  import headerBack from "../../header/headerBack.vue";
  import getUserInfo from "../../common/getUserInfo.vue";
  import { Divider } from "vux";
  export default {
    data() {
      return {
        searchInput: "",
        searchResult: "",
        searchUserResult: [], //搜索用户的结果
        searchPostResult: [], //搜索插画的结果
        showSearchUserResult: false, //true为有结果，false为没结果
        showSearchPostResult: false //true为有结果，false为没结果
      };
    },
    components: {
      headerBack,
      Divider,
      getUserInfo
    },
    activated() {
      this.getData();
    },
    deactivated() {
      this.searchUserResult = [];
      this.searchPostResult = [];
    },
    methods: {
      getData() {
        let _this = this;
        this.searchInput = this.$storage.loadStorage("_SEARCH_INPUT_");
        this.searchResult = this.$storage.loadStorage("_SEARCH_RESULT_");
        // console.log(this.searchResult[1].length);
        let searchUserResultTmp = this.searchResult[0];
        let searchPostResultTmp = this.searchResult[1];

        if (searchUserResultTmp.length !== 0) {
          for (let key in searchUserResultTmp) {
            _this.showSearchUserResult = true;
            _this.searchUserResult.push(searchUserResultTmp[key]);
          }
          // console.log(_this.searchUserResult);
        } else {
          _this.showSearchUserResult = false;
        }
        if (searchPostResultTmp.length !== 0) {
          for (let key in searchPostResultTmp) {
            _this.showSearchPostResult = true;
            _this.searchPostResult.push(searchPostResultTmp[key]);
          }
          // console.log(_this.searchPostResult);
        } else {
          _this.showSearchPostResult = false;
        }
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
  .searchResult {
    height: calc(100vh - 0.6rem);
    .searchTitle {
      padding-top: 0.6rem;
      font-size: 0.4rem;
    }
    .resultMain {
      padding-top: 0.6rem;
      .resultUser {
        .title {
          padding: 0.12rem 0 0.12rem 0.12rem;
          font-size: 0.36rem;
          width: 100%;
        }
        .main {
          font-size: 0.3rem;
          .haveResult {
            // width: 100%;
            height: 100%;
            .haveResultItem:first-child {
              border-top: 0.01rem solid #e6e6e6;
            }
            .haveResultItem {
              display: flex;
              height: 1rem;
              padding-top: 0.2rem;
              border-bottom: 0.01rem solid #e6e6e6;
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
                  max-width: 6rem;
                  display: inline-block;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
          .noResult {
            border-top: 0.01rem solid #e6e6e6;
            // border-bottom: 0.01rem solid #e6e6e6;
            height: 0.4rem;
            line-height: 0.4rem;
          }
        }
      }
      .resultPost {
        .title {
          padding: 0.12rem 0 0.12rem 0.12rem;
          font-size: 0.36rem;
          width: 100%;
        }
        .main {
          font-size: 0.3rem;
          .haveResult {
            .haveResultItem {
              // display: flex;
              // height: 1rem;
              padding-top: 0.2rem;
              border-bottom: 0.01rem solid #e6e6e6;
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
                  max-width: 6rem;
                  display: inline-block;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
              .statesText {
                width: 100%;
                //   height: 1.8rem;
                // background-color: gray;
                // border-top: 0.1px solid #e6e6e6;
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
          .noResult {
            border-top: 0.01rem solid #e6e6e6;
            // border-bottom: 0.01rem solid #e6e6e6;
            height: 0.6rem;
            line-height: 0.6rem;
          }
        }
      }
    }
  }
</style>
