const server = require("./server");
const { corsOptions } = require("./constants");

const SocketStatusController = require("./controllers/SocketStatusController");

const io = require("socket.io")(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  //updating the socket upon new connection
  socket.on("me", (phone) => {
    SocketStatusController.setUserNewSocketStatus(phone, socket.id);
  });

  //sending messages
  socket.on("send_message", async (message) => {
    if (await SocketStatusController.getUserIsActive(message.to)) {
      const socketId = await SocketStatusController.getUserSocket(message.to);
      socket.to(socketId.socketId).emit("send_message", {
        from: message.from,
        message: message.message,
        timing: Date.now(),
      });
    }
  });

  //sending call offers
  socket.on("call_user", async ({ to, from, fromSocket, signal }) => {
    console.log("calling user");
    if (await SocketStatusController.getUserIsActive(to)) {
      const socketId = await SocketStatusController.getUserSocket(to);
      socket.to(socketId.socketId).emit("call_user", {
        from,
        fromSocket,
        signal,
      });
    }
  });

  //sending answers to calls
  socket.on("answer_call", ({ to, signal }) => {
    socket.to(to).emit("answer_call", { signal });
  });

  //updating status upon disconnect
  socket.on("disconnect", () => {
    SocketStatusController.setUserActiveStatus(socket.id);
  });
});
