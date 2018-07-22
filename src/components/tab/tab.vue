<template>
  <div class="tab-content">
    <ul class="tab">
      <li class="tab-item" v-for="(item, index) in tabs" @click="switchItem(index)" :class="{'active':currentIndex == index}"
        v-bind:key="index">
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // isActive: 0
      };
    },
    props: {
      tabs: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      switchItem(index) {
        this.$emit("switch", index);
        this.isActive = index;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .tab-content {
    width: 100%;
    padding-top: 30px;
    font-size: 16px;
    line-height: 24px;
    /* display: inline; */
    .tab {
      display: flex;
      .tab-item {
        display: inline-block;
        padding: 5px 20px;
        flex: 1;
        text-align: center;
      }
      .active {
        background-color: pink;
      }
    }
  }
</style>
