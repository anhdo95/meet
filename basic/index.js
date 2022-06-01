const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3005;

io.on("connection", (socket) => {
  console.log("connected", socket.id);

  const log = (text) => {
    socket.emit("log", `Message from server: ${text}`);
  };

  socket.on('message', message => {
    socket.broadcast.emit('message', message)
  })

  socket.on("create or join", (room) => {
    log("Received request to create or join room " + room);

    const clientsInRoom = io.sockets.adapter.rooms.get(room);
    const numberOfClients = clientsInRoom
      ? clientsInRoom.size
      : 0;

    log(`Number of clients in room ${room}: ${numberOfClients}`);

    if (numberOfClients === 0) {
      socket.join(room);
      log("Created room " + room);
      socket.emit("created");
    } else if (numberOfClients === 1) {
      socket.join(room);
      log("Joined room " + room);
      socket.emit("joined");
      io.to(room).emit("join");
    } else {
      // max 2 rooms
      socket('full' + room)
    }
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('hangup')
  })
});

app.use(express.static(path.join(__dirname, "public")));

server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
