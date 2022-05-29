var store = new Vuex.Store({
  state: {
    isCallable: false,
    personalCode: uuid.v4(),
    friendCode: null,
  },
  mutations: {
    setIsCallable(state, isCallable) {
      state.isCallable = isCallable;
    },
    setFriendCode(state, code) {
      state.friendCode = code
    },
  },
});
