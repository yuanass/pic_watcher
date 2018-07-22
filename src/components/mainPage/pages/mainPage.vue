<template>
  <div class="mainPage">
    <tab :line-width=2 active-color='rgb(084, 129, 180)' v-model="index" style="padding-top: 30px;"
      duration="100">
      <tab-item class="vux-center">最新</tab-item>
      <tab-item class="vux-center">排行榜</tab-item>
      <tab-item class="vux-center">提醒</tab-item>
    </tab>
    <tab v-model="index" active-color='rgb(084, 129, 180)'>
      <tab-item class="vux-center">最新</tab-item>
      <tab-item class="vux-center">排行榜</tab-item>
      <tab-item class="vux-center">提醒</tab-item>
    </tab>
    <swiper v-model="index" :show-dots="false" :min-moving-distance='50' class="swiper">
      <swiper-item class="swiperItem">
        <div class="testA">
          <latest></latest>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="testB">
          <rank-list></rank-list>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="testC">
          <reminder></reminder>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import Vue from "vue";
  import VueRouter from "vue-router";
  import tab from "../../tab/tab.vue";
  import rankList from "./rankList.vue";
  import latest from "./latest.vue";
  import search from "./search.vue";
  import reminder from "./reminder.vue";
  import { Tab, TabItem, Swiper, SwiperItem } from "vux";

  Vue.use(VueRouter);

  export default {
    data() {
      return {
        index: 0,
        currentIndex: 0,
        tabs: [{ name: "Latest" }, { name: "RankList" }, { name: "Search" }]
      };
    },
    methods: {
      switchItem(index) {
        this.currentIndex = index;
      }
    },
    components: {
      "a-tab": tab,
      rankList,
      latest,
      search,
      reminder,
      Swiper,
      Tab,
      TabItem,
      SwiperItem
    }
  };
</script>

<style lang="scss">
  // @import "../../../static/css/reset.css";
  @import "../../../../static/css/reset.css";
  .mainPage {
    .vux-slider {
      .vux-swiper {
        height: calc(100vh - 1.05rem - 1.3rem) !important;
        overflow-y: scroll;
      }
    }
    .testA {
      font-size: 0.5rem;
      // overflow: scroll;
    }
    .swiper {
      overflow: hidden;
      .swiperItem {
        overflow: scroll;
      }
    }
  }
</style>
