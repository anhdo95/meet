const set = (key) => (state, value) => (state[key] = value);

const store = new Vuex.Store({
  state: {
    isCallable: false,
    personalCode: null,
    friendCode: null,
    callState: constants.CALL_STATE.UNAVAILABLE,

    peerConnection: null,
    peerCode: null,
    localStream: null,
    remoteStream: null,
    screenStream: null,

    isMicEnabled: true,
    isCameraEnabled: true,
    isScreenSharing: false,
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
    setPeerCode: set("peerCode"),
    setLocalStream: set("localStream"),
    setRemoteStream: set("remoteStream"),
    setScreenStream: set("screenStream"),

    setIsMicEnabled: set("isMicEnabled"),
    setIsCameraEnabled: set("isCameraEnabled"),
    setIsScreenSharing: set("isScreenSharing"),
    setIsRecordingEnabled: set("isRecordingEnabled"),

    resetButtonsState(state) {
      state.isMicEnabled = true;
      state.isCameraEnabled = true;
      state.isScreenSharing = false;
      state.isRecordingEnabled = false;
    },

    setModal: set("modal"),
    closeModal(state) {
      state.modal.type = constants.MODAL_TYPE.NONE;
    }
  },
});
