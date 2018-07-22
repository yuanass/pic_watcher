<template>
  <div class="content">
    <x-button class="submitBtn">提交</x-button>
  </div>
</template>

<script>
  import { XButton } from "vux";
  export default {
    components: {
      XButton
    }
  };
</script>

<style lang="scss">
  .content {
    text-align: center;
    .submitBtn {
      width: 6rem;
      height: 0.8rem;
      color: #fff;
      background-color: rgb(084, 129, 180);
    }
  }
</style>
