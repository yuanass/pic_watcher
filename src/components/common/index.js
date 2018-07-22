import mySubmitBtn from './submitBtn.vue';
// import lookPic2 from './lookPic2.vue';

const submitBtn = {
  install: function (Vue) {
    Vue.component('submitBtn', mySubmitBtn);
  }
}

export default submitBtn;
// let data = {
//   "submitBtn": mySubmitBtn,
//   "lookPic2": lookPic2
// }
// export default {
//   install (Vue) {
//     Vue.component(data);
//   }
// }
