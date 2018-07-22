export default {
  namespaced: true,
  state: {
    index: false,
    test: '11',
    showLookPic: false,
    itemOfSelectedPic: {},
    thumbArr: [],
    asd: [],
    mockAllPost: [
      {
        userName: "yuanass",
        postText:
          "yuanshajojaihflaksfkalsfhashfkjahsfkhaskjhakshkashflwpqiuqjdlkajsldkjaslkdjlaskjdlkasjdlsjyuanshajojaihflaksfkalsfhashfkjahsfkhaskjhakshkashflwpqiuqjdlkajsldkjaslkdjlaskjdlkasjdlsj",
        postDate: "2018-01-11",
        post: "../../../../static/img/miao.jpg"
      },
      {
        userName: "yuanass",
        postText:
          "yuanshajojaihflaksfkalsfhashfkjahsfkhaskjhakshkashflwpqiuqjdlkajsldkjaslkdjlaskjdlkasjdlsjyuanshajojaihflaksfkalsfhashfkjahsfkhaskjhakshkashflwpqiuqjdlkajsldkjaslkdjlaskjdlkasjdlsj",
        postDate: "2018-01-11",
        post: "../../../../static/img/y.jpg"
      }
    ],
    lookPicPath: ''
  },
  mutations: {
    pushThumbArr (state, params) {
      state.thumbArr.push(params);
      state.asd = state.thumbArr;
    },
    clearThumbArr (state) {
      state.thumbArr.splice(0, state.thumbArr.length);
    },
    changeIndex (state, params) {
      state.index = params;
    },
    pushInToItem (state, params) {
      state.itemOfSelectedPic = params;
    }
  },
  getters: {
    thumbNumArr: (state, getters) => {
      return state.thumbArr;
    }
  }
}
