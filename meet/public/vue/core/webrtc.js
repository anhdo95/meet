const webrtc = {
  sendPreOffer(data) {
    wss.emitPreOffer(data);
  },
};
