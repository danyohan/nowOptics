import { Server as WebSocketServer } from "socket.io";
import http from "http";
import Sockets from "./backend/noteSockets";
import app from "./app";
import { connectDB } from "./config/db";
import { PORT } from "./config/config";

connectDB();
const server = http.createServer(app);
const httpServer = server.listen(PORT);
const io = new WebSocketServer(httpServer);


app.get("/chats", (req, res) => {
  res.render("chats");
});

app.get("/chat", (req, res) => {
  const username = req.query.username;

   io.emit("joined", username);
   res.render("chat", { username });
});


Sockets(io);
