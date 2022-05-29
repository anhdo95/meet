Vue.component("video-call", {
  template: `
    <div class="video-call">
      <div class="video-call__local">
        <video class="video-call__local-video" autoplay muted playsinline></video>
      </div>

      <div class="video-call__remote">
        <video class="video-call__remote-video" autoplay muted playsinline></video>
      </div>

      <div class="video-call__buttons">
        <mic-icon v-if="isMicEnabled" class="cursor-pointer video-call__icon" @click="handleMic" />
        <mic-off-icon v-else class="cursor-pointer video-call__icon" @click="handleMic" />

        <camera-icon v-if="isCameraEnabled" class="cursor-pointer video-call__icon" @click="handleCamera" />
        <camera-off-icon v-else class="cursor-pointer video-call__icon" @click="handleCamera" />

        <hangup-icon class="cursor-pointer video-call__icon video-call__icon--hangup" />
        <share-screen-icon class="cursor-pointer video-call__icon" />
        <recording-icon class="cursor-pointer video-call__icon" />
      </div>
    </div>
  `,

  data() {
    return {
      isMicEnabled: true,
      isCameraEnabled: true,
    };
  },

  methods: {
    handleMic() {
      this.isMicEnabled = !this.isMicEnabled;
    },

    handleCamera() {
      this.isCameraEnabled = !this.isCameraEnabled;
    },
  },
});
