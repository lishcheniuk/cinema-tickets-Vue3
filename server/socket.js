module.exports = function (server) {
  const WSServer = require("express-ws")(server);
  const aWss = WSServer.getWss();
  const { v4: uuidv4 } = require("uuid");

  server.ws("/", (ws, _req) => {
    ws.id = uuidv4();

    ws.on("message", (msg) => {
      msg = JSON.parse(msg);

      switch (msg.method) {
        case "buy":
          broadcastConnection(ws, { method: "update" });
          break;
      }
    });
  });

  function broadcastConnection(ws, msg) {
    aWss.clients.forEach((client) => {
      if (client.id !== ws.id) {
        client.send(JSON.stringify(msg));
      }
    });
  }
};
