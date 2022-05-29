var store = new Vuex.Store({
  state: {
    personalCode: uuid.v4(),
    friendCode: null
  },
  mutations: {
    setFriendCode(state, code) {
      state.friendCode = code
    },
  },
});
