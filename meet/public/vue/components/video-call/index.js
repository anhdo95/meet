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
        <span class="video-call__button">
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
      "localStream",
      "remoteStream",
      "isMicEnabled",
      "isCameraEnabled",
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
      this.$refs.localVideo.srcObject = this.localStream;
    }
  },

  methods: {
    ...Vuex.mapMutations([
      "setIsMicEnabled",
      "setIsCameraEnabled",
      "setIsRecordingEnabled",
    ]),

    handleMic() {
      this.localStream.getAudioTracks()[0].enabled = !this.isMicEnabled
      this.setIsMicEnabled(!this.isMicEnabled);
    },

    handleCamera() {
      this.localStream.getVideoTracks()[0].enabled = !this.isCameraEnabled
      this.setIsCameraEnabled(!this.isCameraEnabled);
    },

    handleRecording() {
      this.setIsRecordingEnabled(!this.isRecordingEnabled);
    },
  },
});
