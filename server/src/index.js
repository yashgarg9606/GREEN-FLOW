const express = require("express");
const { tickSignals, getSignals } = require("./signalManager");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/signals", (req, res) => {
  res.json(getSignals());
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

const PORT = 8000;

setInterval(() => {
  tickSignals(io);
}, 1000);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});