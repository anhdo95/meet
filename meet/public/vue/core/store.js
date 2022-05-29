const set = (key) => (state, value) => (state[key] = value);

const store = new Vuex.Store({
  state: {
    isCallable: false,
    personalCode: null,
    friendCode: null,

    localStream: null,
    remoteStream: null,

    modal: {
      type: constants.MODAL_TYPE.NONE,
      onClose() {},
      onOk() {},
      onCancel() {}
    }
  },

  mutations: {
    setIsCallable: set("isCallable"),
    setPersonalCode: set("personalCode"),
    setFriendCode: set("friendCode"),
    setLocalStream: set("localStream"),
    setRemoteStream: set("remoteStream"),
    setModal: set("modal"),
    closeModal(state) {
      state.modal.type = constants.MODAL_TYPE.NONE;
    }
  },
});
