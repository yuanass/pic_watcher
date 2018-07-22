export default {
  namespaced: true,
  test: '',
  state: {
    userInfo: {}, //储存登陆的用户信息
    testGetter: true,
    changeContent: ''
  },
  mutations: {
    saveUserInfo (state, params) {
      state.userInfo = params;
    },
    CHANGE_TEST_GETTER (state, value) {
      state.testGetter = value;
    },
    changeContent (state, value) {
      state.changeContent = value;
    }
  },
  actions: {
    changeTestGetter ({ commit }, value) {
      commit("CHANGE_TEST_GETTER");
    }
  },
  getters: {
    showTest: function () {
      return state.testGetter;
    }
  }
}
