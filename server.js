const fs = require("fs");
const path = require("path");
const glob = require("glob");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;

glob("public/vue/components/**/*.@(js|css)", (error, files) => {
  const css = files.filter((file) => path.extname(file) === ".css");
  const js = files.filter((file) => path.extname(file) === ".js");

  const replaceRootPath = (path) => path.replace(/^public\//, "");

  const styles = css.reduce((styles, file) => {
    return (styles += `<link rel="stylesheet" href="${replaceRootPath(
      file
    )}">\n`);
  }, "");

  const scripts = js.reduce((scripts, file) => {
    return (scripts += `<script src="${replaceRootPath(file)}"></script>\n`);
  }, "");

  fs.readFile("public/template.html", "utf8", (error, data) => {
    const html = data
      .replace("{{ STYLES }}", styles)
      .replace("{{ SCRIPTS }}", scripts);
    fs.writeFileSync("public/index.html", html, "utf8");
  });
});

app.use(express.static("public"));

const PRE_OFFER_ANSWER = {
  CALLEE_NOT_FOUND: "CALLEE_NOT_FOUND",
  CALLEE_FOUND: "CALLEE_FOUND",
  CALLEE_ACCEPTED: "CALLEE_ACCEPTED",
  CALLEE_REJECTED: "CALLEE_REJECTED",
  CALLEE_UNAVAILABLE: "CALLEE_UNAVAILABLE",
};

const clients = new Set();
io.on("connection", (socket) => {
  const log = (message) => {
    socket.emit("log", `Message from server: ${message}`);
  };

  log(`Socket id ${socket.id} connected!`);
  clients.add(socket.id);

  socket.on("pre-offer", ({ calleeCode }) => {
    if (clients.has(calleeCode)) {
      log("Callee is found");
      socket.emit("pre-offer-answer", PRE_OFFER_ANSWER.CALLEE_FOUND);
      socket.to(calleeCode).emit("pre-offer", {
        callerCode: socket.id,
      });
      return;
    }

    log("Callee not found");
    socket.emit("pre-offer-answer", PRE_OFFER_ANSWER.CALLEE_NOT_FOUND);
  });

  socket.on("pre-offer-answer", (data) => {
    log(`Callee answer ${data.answer}`);
    socket.to(data.callerCode).emit("pre-offer-answer", data.answer);
  });

  socket.on("signaling", (data) => {
    log(`Send ${data.type} to peer ${data.peerCode}`);
    if (clients.has(data.peerCode)) {
      socket.to(data.peerCode).emit("signaling", { ...data, peerCode: socket.id });
    }
  });

  socket.on("hang-up", (data) => {
    log(`Send hangup to peer ${data.peerCode}`);
    if (clients.has(data.peerCode)) {
      socket.to(data.peerCode).emit("hang-up", { ...data, peerCode: socket.id });
    }
  });

  socket.on("disconnect", () => {
    log(`Socket id ${socket.id} disconnected!`);
    clients.delete(socket.id);
    socket.broadcast.emit('disconnected')
  });
});

server.listen(PORT, () => console.log(`Listening on ${PORT} port`));
