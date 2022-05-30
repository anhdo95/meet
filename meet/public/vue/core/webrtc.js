const webrtc = {
  sendPreOffer(data) {
    wss.emitPreOffer(data);
  },

  sendPreOfferAnswer(data) {
    wss.emitPreOfferAnswer(data);
  },
};
