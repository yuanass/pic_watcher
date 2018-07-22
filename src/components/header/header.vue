<template>
  <div class="header">
    <div class="content">
      <div class="headetName">
        {{msg}}
      </div>
    </div>
    <div class="search">
      <!-- <i class="icon-search"></i> -->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: ["msg"]
  };
</script>

<style lang="scss">
  @import "../../../static/css/reset.css";
  @import "../../../static/css/style2.css";

  .header {
    height: 0.6rem;
    background-color: rgb(084, 129, 180);
    position: fixed;
    margin: 0;
    padding: 0;
    width: 100%;
    display: inline;
    z-index: 800;
    text-align: center;
    .content {
      margin: 0.1rem auto;
      .headetName {
        width: 100%;
        height: 100%;
        display: inline-block;
        font-size: 0.4rem;
        color: white;
        font-weight: bold;
        /* left: 40%; */
        position: relative;
        float: left;
        /* top: 25%; */
      }
    }
  }
</style>
