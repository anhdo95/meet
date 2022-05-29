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
    return (scripts += `<script src="${replaceRootPath(
      file
    )}"></script>\n`);
  }, "");

  fs.readFile("public/template.html", "utf8", (error, data) => {
    const html = data
      .replace("{{ STYLES }}", styles)
      .replace("{{ SCRIPTS }}", scripts);
    fs.writeFileSync("public/index.html", html, "utf8");
  });
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("socket :>> ", socket);
});

server.listen(PORT, () => console.log(`Listening on ${PORT} port`));
