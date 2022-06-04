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
  }) {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
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

    const remoteStream = new MediaStream()
    peerConnection.ontrack = ({ track }) => {
      remoteStream.addTrack(track)
      onAddStream(remoteStream);
    }

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    return peerConnection;
  },

  replaceTrack(peerConnection, stream, onEnded) {
    if (!peerConnection) return;
    
    const videoTrack = stream.getVideoTracks()[0]
    const sender = peerConnection
      .getSenders()
      .find((sender) => sender.track.kind === videoTrack.kind);

    if (!sender) return
    
    sender.replaceTrack(videoTrack)
    videoTrack.onended = onEnded
  },

  async startSharingScreen(peerConnection, onEnded) {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
    webrtc.replaceTrack(peerConnection, stream, onEnded)
    return stream;
  },

  stopSharingScreen(peerConnection, screenStream, localStream) {
    screenStream.getTracks().forEach((track) => track.stop())
    webrtc.replaceTrack(peerConnection, localStream)
  }
};
