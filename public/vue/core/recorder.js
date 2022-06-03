const recorder = {
  instance: null,
  filename: "recording.webm",

  start(stream, filename) {
    const options = { mimeType: "video/webm; codecs=vp9" };
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = recorder.handleDataAvailable;
    mediaRecorder.start();

    if (filename) {
      recorder.filename = filename;
    }

    recorder.instance = mediaRecorder;
  },

  stop() {
    recorder.instance.stop();
  },

  handleDataAvailable({ data }) {
    if (data.size > 0) {
      recorder.download(data);
    }
  },

  download(data) {
    const blob = new Blob([data], { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = recorder.filename;
    a.click();
    window.URL.revokeObjectURL(url);
  },
};
