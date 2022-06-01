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

  onPreOffer(listener) {
    return wss.socket.on('pre-offer', listener);
  },

  onPreOfferAnswer(listener) {
    return wss.socket.on('pre-offer-answer', listener);
  },

  onSignaling(listener) {
    return wss.socket.on('signaling', listener);
  },

  emitPreOffer(data) {
    return wss.socket.emit('pre-offer', data)
  },

  emitPreOfferAnswer(data) {
    return wss.socket.emit('pre-offer-answer', data)
  },

  emitSignaling(data) {
    return wss.socket.emit('signaling', data)
  }
};
