Vue.component("dashboard", {
  template: `
    <div class="dashboard">
      <h1 class="dashboard__logo">
        M<span class="dashboard__highlight">ee</span>t
      </h1>

      <div class="dashboard__video-container">
        <video ref="video" class="dashboard__video" autoplay muted playsinline></video>
      </div>

      <p class="dashboard__howto">Talk with another friend by passing your personal code to him/her</p>
      <div class="dashboard__personal">
        <p>Your personal code</p>
        <div class="dashboard__your-code-container">
          <span class="dashboard__your-code">{{ $store.state.personalCode }}</span>
          <copy-icon class="dashboard__copy-icon cursor-pointer" @click="handleCopy" />
        </div>
      </div>

      <div class="dashboard__friend">
        <p>Your friend code</p>
        <input class="dashboard__friend-code" type="text" v-model="friendCode" />
        <div class="dashboard__buttons">
          <button 
            :class="{
              'cursor-pointer dashboard__video-call': true,
              'dashboard__video-call--disabled': isDisabled
            }" 
            :disabled="isDisabled"
            @click="handleVideoCall"
          >
            <video-call-icon class="dashboard__video-call-icon" />
            Video Call
          </button>
        </div>
      </div>
    </div>
  `,

  data() {
    return {
      friendCode: "",
    };
  },

  computed: {
    ...Vuex.mapState(["localStream", "personalCode"]),
    isDisabled() {
      return !this.friendCode;
    },
  },

  mounted() {
    this.getUserMedia();
  },

  methods: {
    ...Vuex.mapMutations([
      "setFriendCode",
      "setLocalStream",
      "setCallState",
      "setModal",
      "closeModal",
    ]),

    async getUserMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        this.$refs.video.srcObject = stream;
        this.setLocalStream(stream);
        this.setCallState(constants.CALL_STATE.AVAILABLE);
      } catch (error) {
        this.setCallState(constants.CALL_STATE.UNAVAILABLE);
        console.error("getUserMedia", error);
      }
    },

    handleCopy() {
      navigator.clipboard && navigator.clipboard.writeText(this.personalCode);
    },

    handleVideoCall() {
      if (!this.localStream) {
        this.setModal({
          type: constants.MODAL_TYPE.PERMISSION,
          onOk: this.closeModal,
        });
        return;
      }
      this.setFriendCode(this.friendCode);
      webrtc.sendPreOffer({
        calleeCode: this.friendCode,
      });
    },
  },
});
