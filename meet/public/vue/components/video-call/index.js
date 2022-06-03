Vue.component("video-call", {
  template: `
    <div class="video-call">
      <div class="video-call__local">
        <video ref="localVideo" class="video-call__local-video" autoplay muted playsinline></video>
      </div>

      <div class="video-call__remote">
        <video ref="remoteVideo" class="video-call__remote-video" autoplay playsinline></video>
      </div>

      <div class="video-call__buttons">
        <span v-if="isMicEnabled" class="video-call__button" @click="handleMic">
          <mic-icon class="cursor-pointer video-call__icon" />
        </span>
        <span v-else class="video-call__button" @click="handleMic">
          <mic-off-icon class="cursor-pointer video-call__icon" />
        </span>

        <span v-if="isCameraEnabled" class="video-call__button">
          <camera-icon v-if="isCameraEnabled" class="cursor-pointer video-call__icon" @click="handleCamera" />
        </span>
        <span v-else class="video-call__button">
          <camera-off-icon class="cursor-pointer video-call__icon" @click="handleCamera" />
        </span>

        <hangup-icon class="cursor-pointer video-call__icon video-call__icon--hangup" />
        <span class="video-call__button" @click="handleShareScreen">
          <share-screen-icon class="cursor-pointer video-call__icon video-call__icon--share-screen" />
        </span>

        <span v-if="isRecordingEnabled" class="video-call__button" @click="handleRecording">
          <recording-icon class="cursor-pointer video-call__icon" />
        </span>
        <span v-else class="video-call__button" @click="handleRecording">
          <record-icon class="cursor-pointer video-call__icon" />
        </span>
      </div>
    </div>
  `,

  computed: {
    ...Vuex.mapState([
      "peerConnection",
      "localStream",
      "remoteStream",
      "screenStream",
      "isMicEnabled",
      "isCameraEnabled",
      "isScreenSharing",
      "isRecordingEnabled",
    ]),
  },

  watch: {
    remoteStream: {
      handler(stream) {
        if (stream) {
          this.$refs.remoteVideo.srcObject = stream;
        }
      },
    },
    immediate: true,
  },

  mounted() {
    if (this.localStream) {
      this.updateLocalVideo(this.localStream);
    }
  },

  methods: {
    ...Vuex.mapMutations([
      "setScreenStream",
      "setIsMicEnabled",
      "setIsCameraEnabled",
      "setIsScreenSharing",
      "setIsRecordingEnabled",
    ]),

    updateLocalVideo(stream) {
      this.$refs.localVideo.srcObject = stream;
    },

    handleMic() {
      this.localStream.getAudioTracks()[0].enabled = !this.isMicEnabled;
      this.setIsMicEnabled(!this.isMicEnabled);
    },

    handleCamera() {
      this.localStream.getVideoTracks()[0].enabled = !this.isCameraEnabled;
      this.setIsCameraEnabled(!this.isCameraEnabled);
    },

    handleShareScreen() {
      // The screen is sharing
      if (this.screenStream) {
        this.handleStopSharingScreen();
        return;
      }

      this.handleStartSharingScreen();
    },

    async handleStartSharingScreen() {
      const screenStream = await webrtc.startSharingScreen(
        this.peerConnection,
        this.handleStopSharingScreen
      );
      this.updateLocalVideo(screenStream);
      this.setScreenStream(screenStream);
    },

    handleStopSharingScreen() {
      webrtc.stopSharingScreen(
        this.peerConnection,
        this.screenStream,
        this.localStream
      );
      this.updateLocalVideo(this.localStream);
      this.setScreenStream(null);
    },

    handleRecording() {
      this.isRecordingEnabled
        ? recorder.stop()
        : recorder.start(this.remoteStream);
      this.setIsRecordingEnabled(!this.isRecordingEnabled);
    },
  },
});
