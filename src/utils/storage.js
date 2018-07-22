// exports.install = function (Vue, options) {
// Vue.prototype.alertA = function () {
//   alert('这是全局方法');
// };
// Vue.prototype.alertB = function () {
//   alert('这是全局方法B');
// };
// Vue.prototype.setStorage = function (key, value) {
//   let data = {
//     value: value
//   }
//   localStorage[key] = JSON.stringify(data);
// };
// Vue.prototype.getStorage = function (key) {
//   let data = localStorage[key];
//   let str = 'sorry this is no data';
//   if (data === '' || data.length === 0 || data === null || data === undefined) {
//     return str;
//   } else {
//     return data;
//   }
// }
// }



// var storage = {
//   setStorage: function (key, value) {
//     let data = {
//       value: value
//     }
//     localStorage[key] = JSON.stringify(data);
//     // localStorage[key] = data;
//   },
//   getStorage: function (key) {
//     let data = localStorage[key];
//     let str = 'sorry this is no data';
//     if (data === '' || data.length === 0 || data === null || data === undefined) {
//       return str;
//     } else {
//       return JSON.parse(data);
//     }
//   }
// }
// export default storage;
import storage from 'good-storage'

export default {
  saveStorage: (KEY, value) => {
    storage.set(KEY, value);
  },
  loadStorage: (key, isRemoved = false) => {
    let value = storage.get(key, {});
    if (isRemoved) {
      this.deleteStorage(key)
    }
    return value;
  },
  deleteStorage: (KEY) => {
    storage.remove(KEY);
  },
  push (val1, val2) {
    console.log(val1);
    console.log(val2);
  }
}
