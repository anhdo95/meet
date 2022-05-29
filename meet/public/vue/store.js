var store = new Vuex.Store({
  state: {
    isCallable: false,
    personalCode: null,
    friendCode: null,
  },
  mutations: {
    setIsCallable(state, isCallable) {
      state.isCallable = isCallable;
    },
    setPersonalCode(state, personalCode) {
      state.personalCode = personalCode
    },
    setFriendCode(state, code) {
      state.friendCode = code
    },
  },
});
