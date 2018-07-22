<template>
  <div class="searchMain">
    <!-- <p>search</p> -->
    <div class="search">
      <group>
        <x-input class="searchInput" type="text" placeholder="请输入需要搜索的内容" v-model="searchInput"
          :show-clear="true">
          <img slot="label" src="@a/search.png">
          <span slot="right" class="cancel" v-show="cancelBtn" @click="goSearch">搜索</span>
        </x-input>
      </group>
      <div class="historySearch">
        <div class="historyTop">
          <div class="historyTitle">历史搜索：</div>
          <div class="historyClear">
            <span @click="clearHistory">清空历史</span>
          </div>
        </div>
        <div class="historyMain">
          <div class="historyItem" v-for="(item, index) in historyData" :key="index">
            <span @click="pushHistory(item)">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XInput, Group } from "vux";
  export default {
    data() {
      return {
        cancelBtn: false,
        searchInput: "",
        historyData: this.$store.state.searchPageStore.searchHistory
      };
    },
    components: {
      XInput,
      Group
    },
    methods: {
      clearHistory() {
        this.$store.state.searchPageStore.searchHistory.splice(
          0,
          this.$store.state.searchPageStore.searchHistory.length
        );
        // console.log(this.$store.state.searchPageStore.searchHistory);
      },
      pushHistory(item) {
        // console.log(item);
        this.searchInput = item;
      },
      goSearch() {
        this.$store.commit("searchPageStore/saveSearchHistory", this.searchInput);
        // console.log(this.searchInput);
        let _this = this;
        let formData = new FormData();
        let searchContent = {
          searchInput: this.searchInput
        };
        this.$storage.saveStorage("_SEARCH_INPUT_", this.searchInput);
        for (let key in searchContent) {
          formData.append(key, searchContent[key]);
        }
        this.axios
          .post("http://localhost:3000/search", formData, {
            header: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            // console.log(res);
            this.$storage.saveStorage("_SEARCH_RESULT_", res.data);
            this.$router.push({ name: "searchResult" });
          });
      }
    },
    computed: {
      judgeSearchInput() {
        let { searchInput } = this;
        return {
          searchInput
        };
      }
    },
    watch: {
      judgeSearchInput: {
        handler() {
          let _this = this;
          // if (
          //   _this.searchInput === "" ||
          //   _this.searchInput.length === 0 ||
          //   _this.searchInput === undefined
          // ) {
          //   _this.cancelBtn = true;
          // } else {
          //   _this.cancelBtn = false;
          // }
          // console.log(this.searchInput);
          if (this.searchInput === "") {
            _this.cancelBtn = false;
          } else {
            // console.log("not null");
            _this.cancelBtn = true;
          }
        }
      }
    }
  };
</script>

<style lang="scss">
  .searchMain {
    padding-top: 0.4rem;
    height: calc(100vh - 1.25rem) !important;
    background-color: #eeeeee;
    overflow: hidden;
    .search {
      .searchInput {
        font-size: 0.35rem;
        background-color: #fff;
        img {
          width: 0.5rem;
          height: 0.5rem;
          padding-right: 0.2rem;
        }
        .cancel {
          color: #1196ee;
        }
      }
      .historySearch {
        margin-top: 0.2rem;
        width: 100%;
        height: 3rem;
        background-color: #fff;
        .historyTop {
          display: flex;
          height: 0.52rem;
          // border-bottom: 1px solid #eeeeee;
          box-shadow: 0 0.05rem #f7f7f7;
          .historyTitle {
            font-size: 0.3rem;
            // font-weight: bold;
            color: #444;
            height: 0.4rem;
            flex: 4.5;
            padding-left: 0.1rem;
            padding-top: 0.05rem;
            line-height: 0.4rem;
          }
          .historyClear {
            font-size: 0.3rem;
            // font-weight: bold;
            color: #444;
            flex: 1;
            height: 0.4rem;
            line-height: 0.4rem;
            padding-top: 0.05rem;
          }
        }
        .historyMain {
          margin-top: 0.2rem;
          display: flex;
          // flex-direction: column;
          flex-wrap: wrap;
          white-space: pre-wrap;
          // width: 4rem;
          // word-wrap: break-word;
          // max-width: 100%;
          overflow: scroll;
          .historyItem {
            // flex: 1;
            max-width: 1.8rem;
            min-width: 1rem;
            font-size: 0.3rem;
            height: 0.4rem;
            line-height: 0.4rem;
            overflow: hidden;
            padding: 0.05rem 0.1rem;
            margin: 0.08rem 0.1rem;
            border: 0.01rem solid #1196ee;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            // display: inline-block;
            span {
              line-height: 0.2rem;
            }
          }
        }
      }
    }
  }
</style>
