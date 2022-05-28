const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log('socket :>> ', socket);
});

server.listen(PORT, () => console.log(`Listening on ${PORT} port`));
