<template>
  <div>
    <div>this is user Collect {{this.userId}}</div>
    <div class="">我收藏的插画：</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: ["userId"],
    created() {
      this.getUserCollect();
    },
    methods: {
      getUserCollect() {
        let formData = new FormData();
        let _this = this;
        let user = {
          userId: _this.userId
        };
        for (let key in user) {
          formData.append(key, user[key]);
        }
        this.axios
          .post("http://localhost:3000/getUserCollect", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(function(response) {
            let arr = response.data;
          });
      }
    }
  };
</script>
