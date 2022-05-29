var store = new Vuex.Store({
  state: {
    isCallable: true,
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
