import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // User joins his own room
    socket.on("join", (userId) => {
      socket.join(userId);

      console.log(`User ${userId} joined room`);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });
};

export const getIO = () => io;