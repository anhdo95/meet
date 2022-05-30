Vue.component("app", {
  template: `
    <main class="app">
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

    /**
     * Log messages from the server
     */
    wss.onLog((message) => {
      console.log(message);
    });

    /**
     * Listen to pre-offer from a caller
     */
    wss.onPreOffer(({ callerCode }) => {
      if (this.callState === constants.CALL_STATE.AVAILABLE) {
        this.setModal({
          type: constants.MODAL_TYPE.INCOMING_CALL,
          onApprove: this.handleCalleeApprove,
          onReject: this.handleCalleeReject
        })
      } else {
        webrtc.sendPreOfferAnswer({
          callerCode,
          answer: constants.PRE_OFFER_ANSWER.CALLEE_UNAVAILABLE,
        });
      }
    })

    /**
     * Listen to the callee state from the server
     */
    wss.onPreOfferAnswer((answer) => {
      switch (answer) {
        case constants.PRE_OFFER_ANSWER.CALLEE_FOUND:
          this.handleCalleeFound();
          break;

        case constants.PRE_OFFER_ANSWER.CALLEE_NOT_FOUND:
          this.handleCalleeNotFound()
          break;

        case constants.PRE_OFFER_ANSWER.CALLEE_UNAVAILABLE:
          this.handleCalleeUnavailable()
          break;

        default:
          break;
      }
    });
  },

  computed: {
    ...Vuex.mapState({
      isCallable: "isCallable",
      callState: "callState",
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

    // async handlePreOffer() {
    //   try {
    //     const stream = await navigator.mediaDevices.getUserMedia({
    //       video: true,
    //       audio: true,
    //     });
    //     this.setLocalStream(stream);
    //     this.setIsCallable(true);
    //   } catch (error) {
    //     console.error("handlePreOfferAnswer", error);
    //   }
    // },

    handleCalleeFound() {
      this.setModal({
        type: constants.MODAL_TYPE.CALLING,
        onReject: this.handleReject
      })
    },

    handleCalleeNotFound() {
      this.setModal({
        type: constants.MODAL_TYPE.NOT_FOUND,
        onOk: this.closeModal
      })
    },

    handleCalleeUnavailable() {
      this.setModal({
        type: constants.MODAL_TYPE.UNAVAILABLE,
        onOk: this.closeModal
      })
    }
  },
});
