Vue.component("app", {
  template: `
    <main>
      <video-call v-if="isCallable" />
      <dashboard v-else />
      <modals />
    </main>
  `,

  created() {
    wss.init();

    wss.onConnect(() => {
      this.setPersonalCode(wss.socket.id);
    });

    wss.onLog((message) => {
      console.log(message);
    });

    wss.onPreOfferAnswer((answer) => {
      console.log("answer :>> ", answer);
      switch (answer) {
        case constants.PRE_OFFER_ANSWER.AVAILABLE:
          this.handlePreOfferAnswer();
          break;

        case constants.PRE_OFFER_ANSWER.NOT_FOUND:
          this.handleNotFound()
          break;

        default:
          break;
      }
    });
  },

  computed: {
    ...Vuex.mapState({
      isCallable: "isCallable",
    }),
  },

  methods: {
    ...Vuex.mapMutations([
      "setLocalStream",
      "setIsCallable",
      "setPersonalCode",
      "setModal",
      "closeModal",
    ]),

    async handlePreOfferAnswer() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        this.setLocalStream(stream);
        this.setIsCallable(true);
      } catch (error) {
        console.error("handlePreOfferAnswer", error);
      }
    },

    handleNotFound() {
      this.setModal({
        type: constants.MODAL_TYPE.NOT_FOUND,
        onOk: this.closeModal
      })
    }
  },
});
