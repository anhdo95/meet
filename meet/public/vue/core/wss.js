const wss = {
  socket: null,
  init() {
    wss.socket = io.connect();
  },

  onConnect(listener) {
    return wss.socket.on("connect", listener);
  },

  onLog(listener) {
    return wss.socket.on("log", listener);
  },

  onPreOfferAnswer(listener) {
    return wss.socket.on('pre-offer-answer', listener);
  },

  emitPreOffer(data) {
    return wss.socket.emit('pre-offer', data)
  }
};
