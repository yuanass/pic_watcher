<template>
  <div class="addPic">
    <div class="addPicMain">
      <!-- <x-input class="addPicText" show-clear="false"></x-input> -->
      <!-- <p>this is addpic</p> -->
      <div class="addPicContent">
        <group>
          <!-- <cell :title="'插画标题'" v-model="postTitle" placeholder="请输入标题哦"></cell> -->
          <x-input :title="'插画标题'" v-model="postTitle" placeholder="请输入标题哦" text-align="left"></x-input>
          <x-textarea class="addPicText" placeholder="最多只能输入140个字哦~" :rows="7" :max="140"
            v-model="postText"></x-textarea>
        </group>
      </div>
      <div class="addPicChoosePost">
        <div class="imgList">
          <ul>
            <!-- <li v-for="(item,index) in list" :key="index">
              <div v-html="item"></div>
              <img class='imgInput' :src='imgInput'>
            </li> -->
            <li v-for="(item, index) in list" :key="index" style="display: inline-block;padding-left: 0.3rem;position: relative;">
              <div class="delete" @click="deletePic(item, index)" style="font-size: 0.35rem;position: absolute;top: 0;background-color: rgba(255, 255, 255, 0.5);width: 100%;padding-left: 0.45rem;">delete</div>
              <img class='imgInput' :src='item' v-if="showImg" :change="getIndex(index)">
            </li>
          </ul>
        </div>
        <input type='file' id='file1' @change='showme' v-show="false" />
        <img src="@a/addPic.png" class="addPicBtn" alt="" @click="addImg" v-show="this.fileNum <= 6">
      </div>
    </div>
    <div class="submitBtn">
      <x-button class="btn" @click.native="judgeTitle">发布</x-button>
    </div>
    <toast v-model="noTitleToast" width="5rem" position="middle" type="text" :time="this.toastTime"
      @on-hide="turnToast">{{this.message}}</toast>
    <toast v-model="addSuccessToast" width="5rem" position="middle" type="text" :time="1500"
      @on-hide="clearInput">{{'发布成功'}}</toast>
  </div>
</template>

<script>
  import { XInput, XTextarea, Group, Cell, XButton, Toast } from "vux";
  export default {
    data() {
      return {
        index: "",
        list: [],
        list2: [],
        showImg: false,
        postTitle: "",
        postText: "",
        // list: ["<input type='file' id='file1' @change='test'/>"],
        fileId: 1,
        fileNum: 1,
        toastTime: 1500,
        message: "",
        noTitleToast: false,
        addSuccessToast: false,
        imgInput1: "",
        postId: ""
        // imgInput2: "",
        // imgInput3: "",
        // imgInput4: "",
        // imgInput5: "",
        // imgInput6: ""
      };
    },
    components: {
      XInput,
      XTextarea,
      Group,
      Cell,
      XButton,
      Toast
    },
    watch: {
      imgInput1(newVal) {
        // 变化时候把图片推进数组
        this.list.push(newVal);
        // this.list2.push(newVal);
        this.showImg = true;
      }
    },
    methods: {
      deletePic(item, index) {
        this.list.splice(index, 1);
        this.list2.splice(index, 1);
        this.fileNum--;
      },
      judgeTitle() {
        if (this.postTitle == "") {
          this.message = "标题不能为空哦！";
          this.noTitleToast = true;
        } else {
          this.postImg();
          this.addRemind();
        }
      },
      postImg() {
        let userId = this.$store.state.loginPageStore.userInfo.userId;
        let userName = this.$store.state.loginPageStore.userInfo.userName;
        let postId = this.getTimeOrPostId("postId");
        this.postId = postId;
        let postDate = this.getTimeOrPostId("date");
        let postTitle = this.postTitle;
        let list = this.list2;
        let postText;
        if (
          this.postText == "" ||
          this.postText == undefined ||
          this.postText.length == 0
        ) {
          postText = "发布插画";
        } else {
          postText = this.postText;
        }
        let arr = this.list;
        let _this = this;
        for (let key in arr) {
          let pic = {
            userId: userId,
            userName: userName,
            postId: postId,
            postDate: postDate,
            postText: postText,
            postTitle: postTitle,
            post: list[key]
          };
          this.realPost(pic);
        }
      },
      addRemind() {
        let followMe = this.$storage.loadStorage("FOLLOW_ME");
        let _this = this;
        if (followMe.length == 0) {
          return;
        } else {
          for (let key in followMe) {
            let formData = new FormData();
            let info = {
              postId: _this.postId,
              userId: followMe[key].userId
            };
            for (let key in info) {
              formData.append(key, info[key]);
            }
            this.axios
              .post("http://localhost:3000/newRemind", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              })
              .then(res => {
                _this.clearInput();
              });
          }
        }
      },
      realPost(pic) {
        let formData = new FormData();
        let _this = this;
        for (let key in pic) {
          formData.append(key, pic[key]);
        }
        this.axios
          .post("http://localhost:3000/postImg", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            _this.postToTestPic(formData);
            if (res) {
              // return;
              _this.addSuccessToast = true;
            }
          });
      },
      postToTestPic(formData) {
        this.axios
          .post("http://localhost:3000/add5", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            // console.log(res);
            return;
          });
      },
      clearInput() {
        this.postTitle = "";
        this.postText = "";
        let len = this.list.length;
        this.list.splice(0, len);
        this.list2.splice(0, len);
      },
      getTimeOrPostId(type) {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var minute = date.getMinutes();
        var hour = date.getHours();
        var second = date.getSeconds();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        if (minute >= 0 && minute <= 9) {
          minute = "0" + minute;
        }
        if (hour >= 0 && hour <= 9) {
          hour = "0" + hour;
        }
        if (second >= 0 && second <= 9) {
          second = "0" + second;
        }
        var postId =
          date.getFullYear() + month + strDate + hour + minute + second;
        var currentdate =
          date.getFullYear() +
          seperator1 +
          month +
          seperator1 +
          strDate +
          " " +
          hour +
          seperator2 +
          minute +
          seperator2 +
          second;
        if (type == "postId") {
          return postId;
        } else if (type == "date") {
          return currentdate;
        }
      },
      getLocation(item) {
        // console.log(item);
      },
      addImg() {
        let _this = this;
        if (this.$store.state.loginPageStore.userInfo.userId === undefined) {
          this.$router.push({ name: "login" });
        } else {
          // return;
          document.getElementById("file" + _this.fileId).click();
          _this.fileNum++;
        }
      },
      showme: function(e) {
        // this.showMeCount++;
        var self = this;
        var inputDOM = e.target;
        var reader = new FileReader();
        reader.onload = function(e) {
          self.imgInput1 = e.target.result;
        };
        // console.log(self.imgInput1);
        reader.readAsDataURL(inputDOM.files[0]);
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        // this.users.headImg = files[0];
        let index = this.index;
        // console.log(files[0]);
        this.list2.push(files[0]);
        // console.log(this.list2);
        // for (let i = 0; i < index; i++) {
        //   this.list2[i] = files[i];
        // }
        // console.log(this.list2);
        // this.$store.state.loginPageStore.userInfo.headImg = files[0];
      },
      turnToast() {
        this.noTitleToast = false;
      },
      getIndex(index) {
        this.index = index;
      }
    }
  };
</script>

<style lang="scss">
  .addPic {
    background-color: #eeeeee;
    .addPicMain {
      background-color: #fff;
      .addPicContent {
        padding-top: 0.1rem;
        .addPicText {
          // width: 100%;
          height: 3.5rem;
          font-size: 0.3rem;
        }
      }
      .addPicChoosePost {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 0.05rem 0.18rem 0;
        .imgList {
          .imgInput {
            width: 1.85rem;
            height: 1.85rem;
          }
        }
        .addPicBtn {
          padding: 0 0.2rem;
          width: 1.6rem;
          height: 1.6rem;
        }
      }
    }
    .submitBtn {
      padding: 0.3rem 0.3rem 0 0;
      float: right;
      .btn {
        font-size: 0.35rem;
        width: 2rem;
        height: 0.8rem;
        color: #fff;
        background-color: rgb(084, 129, 180);
      }
    }
  }
</style>
