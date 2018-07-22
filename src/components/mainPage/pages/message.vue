<template>
  <div class="messageMain">
    <x-input class="messageInput">
    </x-input>
  </div>
</template>

<script>
  import { XInput } from "vux";
  export default {
    data() {
      return {};
    },
    components: {
      XInput
    }
  };
</script>

<style lang="scss">
  .messageMain {
    background-color: #eeeeee;
    height: calc(100vh);
    .messageInput {
      background-color: #fff;
      height: 0.4rem;
      font-size: 0.3rem;
      position: fixed;
      bottom: 0.8rem;
      left: 0;
      width: 100%;
    }
  }
</style>
