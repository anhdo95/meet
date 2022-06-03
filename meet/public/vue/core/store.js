const set = (key) => (state, value) => (state[key] = value);

const store = new Vuex.Store({
  state: {
    isCallable: false,
    personalCode: null,
    friendCode: null,
    callState: constants.CALL_STATE.UNAVAILABLE,

    peerConnection: null,
    localStream: null,
    remoteStream: null,

    isMicEnabled: true,
    isCameraEnabled: true,
    isRecordingEnabled: false,

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
    setCallState: set("callState"),

    setPeerConnection: set("peerConnection"),
    setLocalStream: set("localStream"),
    setRemoteStream: set("remoteStream"),

    setIsMicEnabled: set("isMicEnabled"),
    setIsCameraEnabled: set("isCameraEnabled"),
    setIsRecordingEnabled: set("isRecordingEnabled"),

    setModal: set("modal"),
    closeModal(state) {
      state.modal.type = constants.MODAL_TYPE.NONE;
    }
  },
});
