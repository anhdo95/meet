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
      console.log('onPreOffer :>> ', callerCode);
      if (this.callState === constants.CALL_STATE.AVAILABLE) {
        this.setModal({
          type: constants.MODAL_TYPE.INCOMING_CALL,
          onApprove: this.handleCalleeApprove(callerCode),
          onReject: this.handleCalleeReject(callerCode),
        });
      } else {
        webrtc.sendPreOfferAnswer({
          callerCode,
          answer: constants.PRE_OFFER_ANSWER.CALLEE_UNAVAILABLE,
        });
      }
    });

    /**
     * Listen to the callee state from the server
     */
    wss.onPreOfferAnswer(answer => {
      console.log('onPreOfferAnswer :>> ', answer);
      switch (answer) {
        case constants.PRE_OFFER_ANSWER.CALLEE_ACCEPTED:
          this.handleCalleeAccepted();
          break;

        case constants.PRE_OFFER_ANSWER.CALLEE_FOUND:
          this.handleCalleeFound();
          break;

        case constants.PRE_OFFER_ANSWER.CALLEE_NOT_FOUND:
          this.handleCalleeNotFound();
          break;

        case constants.PRE_OFFER_ANSWER.CALLEE_UNAVAILABLE:
          this.handleCalleeUnavailable();
          break;
      }
    });

    /**
     * Listen to an offer, an answer, or a candidate
     */
    wss.onSignaling((data) => {
      console.log('signaling :>> ', data);
      switch (data.type) {
        case constants.SIGNALING.OFFER:
          this.handleOffer(data);
          break;

        case constants.SIGNALING.ANSWER:
          this.handleAnswer(data.answer);
          break;

        case constants.SIGNALING.CANDIDATE:
          this.handleCandidate(data.candidate);
          break;
      }
    });
  },

  computed: {
    ...Vuex.mapState({
      isCallable: "isCallable",
      personalCode: "personalCode",
      friendCode: "friendCode",
      callState: "callState",
      peerConnection: "peerConnection",
      localStream: "localStream",
    }),
  },

  methods: {
    ...Vuex.mapMutations([
      "setPeerConnection",
      "setLocalStream",
      "setRemoteStream",
      "setIsCallable",
      "setCallState",
      "setPersonalCode",
      "setModal",
      "closeModal",
    ]),

    handleCalleeApprove(callerCode) {
      return () => {
        console.log("create a peer connection");
        // The callee creates a peer connection
        this.setPeerConnection(
          webrtc.createPeerConnection({
            peerCode: callerCode,
            localStream: this.localStream,
            onAddStream: this.handleAddRemoteStream,
            onRemoveRemoteStream: this.handleRemoveRemoteStream,
          })
        );

        webrtc.sendPreOfferAnswer({
          callerCode,
          answer: constants.PRE_OFFER_ANSWER.CALLEE_ACCEPTED,
        });
        this.setCallState(constants.CALL_STATE.UNAVAILABLE);
        this.closeModal();
        this.setIsCallable(true);
      };
    },

    handleCalleeReject(callerCode) {
      return () => {};
    },

    async handleCalleeAccepted() {
      console.log("create a peer connection");
      // The caller creates a peer connection
      const peerConnection = webrtc.createPeerConnection({
        peerCode: this.friendCode,
        localStream: this.localStream,
        onAddStream: this.handleAddRemoteStream,
        onRemoveRemoteStream: this.handleRemoveRemoteStream,
      });
      this.setPeerConnection(peerConnection);

      const offer = await peerConnection.createOffer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      });
      await peerConnection.setLocalDescription(offer);
      console.log('added an offer to local description :>> ', offer);

      webrtc.sendSignaling({
        offer,
        peerCode: this.friendCode,
        type: constants.SIGNALING.OFFER,
      });

      this.setCallState(constants.CALL_STATE.UNAVAILABLE);
      this.closeModal();
      this.setIsCallable(true);
    },

    handleAddRemoteStream(stream) {
      this.setRemoteStream(stream);
    },

    handleCalleeFound() {
      this.setModal({
        type: constants.MODAL_TYPE.CALLING,
        onReject: () => {},
      });
    },

    handleCalleeNotFound() {
      this.setModal({
        type: constants.MODAL_TYPE.NOT_FOUND,
        onOk: this.closeModal,
      });
    },

    handleCalleeUnavailable() {
      this.setModal({
        type: constants.MODAL_TYPE.UNAVAILABLE,
        onOk: this.closeModal,
      });
    },

    /**
     * The callee listens to an offer from the caller
     */
    async handleOffer({ peerCode, offer }) {
      await this.peerConnection.setRemoteDescription(offer);
      console.log("added an offer to remote description :>> ", offer);

      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      console.log('added an answer to local description :>> ', answer);

      webrtc.sendSignaling({
        answer,
        peerCode,
        type: constants.SIGNALING.ANSWER,
      });
    },

    /**
     * The caller listens to an answer from the callee
     */
    async handleAnswer(answer) {
      await this.peerConnection.setRemoteDescription(answer);
      console.log("added an answer to remote description :>> ", answer);
    },

    async handleCandidate(candidate) {
      await this.peerConnection.addIceCandidate(candidate);
      console.log('added candidate to peer connection :>> ', candidate);
    },
  },
});
