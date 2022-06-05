const wss = {
  socket: null,
  init() {
    wss.socket = io.connect();
  },

  onConnect(listener) {
    return wss.socket.on("connect", listener);
  },

  onDisconnected(listener) {
    return wss.socket.on("disconnected", listener);
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

  onHangUp(listener) {
    return wss.socket.on('hang-up', listener);
  },

  emitPreOffer(data) {
    return wss.socket.emit('pre-offer', data)
  },

  emitPreOfferAnswer(data) {
    return wss.socket.emit('pre-offer-answer', data)
  },

  emitSignaling(data) {
    return wss.socket.emit('signaling', data)
  },

  emitHangUp(data) {
    return wss.socket.emit('hang-up', data)
  }
};
