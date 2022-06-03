const webrtc = {
  sendPreOffer(data) {
    wss.emitPreOffer(data);
  },

  sendPreOfferAnswer(data) {
    wss.emitPreOfferAnswer(data);
  },

  sendSignaling(data) {
    wss.emitSignaling(data);
  },

  sendHangUp(data) {
    wss.emitHangUp(data);
  },

  createPeerConnection({
    peerCode,
    localStream,
    onAddStream,
    onRemoveStream,
  }) {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:13902" }],
    });

    peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        webrtc.sendSignaling({
          peerCode,
          candidate,
          type: constants.SIGNALING.CANDIDATE,
        });
      }
    };

    peerConnection.oniceconnectionstatechange = ({ target: { connectionState } }) => {
      console.log("oniceconnectionstatechange :>> ", connectionState);
    };

    peerConnection.onaddstream = ({ stream }) => onAddStream(stream);
    peerConnection.onremovestream = () => onRemoveStream();

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    return peerConnection;
  },
};
