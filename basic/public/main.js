"use strict";

const socket = io.connect();
const state = {
  isInitiator: false,
  /** @type {RTCPeerConnection} */
  pc: null,
  localStream: null,
  remoteStream: null,
  isChannelReady: false,
  isStarted: false,
};
const servers = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:13902",
    },
  ],
};
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

socket.on("connect", () => {
  console.log(socket.id, "connected");
});

socket.on("hangup", () => {
  state.pc.close()
  state.pc = null
  state.remoteStream = null
  state.isChannelReady = false
  state.isStarted = false
});

const room = "UIT";

if (room) {
  socket.emit("create or join", room);
}

socket.on("log", (message) => {
  console.log(message);
});

socket.on("created", () => {
  state.isInitiator = true;
});

socket.on("joined", () => {
  console.log("joined");
  state.isChannelReady = true;
});

socket.on("join", () => {
  state.isChannelReady = true;
});

socket.on("message", (message) => {
  console.log("Received message:", message);

  if (message === "got user media") {
    maybeStart();
  } else if (message.type === "offer") {
    if (!state.isInitiator && !state.isStarted) {
      maybeStart();
    }

    console.log("Add remote description", message);
    state.pc.setRemoteDescription(new RTCSessionDescription(message));
    doAnswer();
  } else if (message.type === "answer") {
    state.pc.setRemoteDescription(new RTCSessionDescription(message));
  } else if (message.type === "candidate") {
    state.pc.addIceCandidate(new RTCIceCandidate(message.candidate));
  }
});

function sendMessage(message) {
  console.log("Client send message:", message);
  socket.emit("message", message);
}

function maybeStart() {
  console.log("maybeStart", state.isStarted);

  if (!state.isStarted && state.localStream && state.isChannelReady) {
    createPeerConnection();

    state.localStream.getTracks().forEach((track) => {
      state.pc.addTrack(track, state.localStream);
    });
    state.isStarted = true;

    if (state.isInitiator) {
      doCall();
    }
  }
}

function createPeerConnection() {
  const pc = new RTCPeerConnection(servers);
  pc.onicecandidate = handleIceCandidate;
  pc.onaddstream = handleAddStream;
  pc.onremovestream = handleRemoveStream;
  state.pc = pc;
}

function doCall() {
  state.pc
    .createOffer({ offerToReceiveVideo: true })
    .then(addLocalDescription)
    .catch(console.error);
}

function doAnswer() {
  state.pc.createAnswer().then(addLocalDescription).catch(console.error);
}

function handleIceCandidate({ candidate }) {
  if (candidate) {
    sendMessage({
      type: "candidate",
      candidate: candidate,
    });
  }
}

function handleAddStream({ stream }) {
  state.remoteStream = stream;
  remoteVideo.srcObject = stream;
}

function handleRemoveStream() {}

function addLocalDescription(description) {
  console.log("Add local description", description);
  state.pc.setLocalDescription(description);
  sendMessage(description);
}

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((mediaStream) => {
    state.localStream = mediaStream;
    localVideo.srcObject = mediaStream;

    if (!state.isInitiator) {
      sendMessage("got user media");
    }
  })
  .catch(console.error);
