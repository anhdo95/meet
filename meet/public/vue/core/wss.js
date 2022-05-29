const wss = {
  socket: null,
  init() {
    wss.socket = io.connect();
  },
  onConnect(listener) {
    return wss.socket.on("connect", listener);
  },
};
