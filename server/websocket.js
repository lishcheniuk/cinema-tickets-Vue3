module.exports = function (wsServer) {
  const aWss = wsServer.getWss();
  const { v4: uuidv4 } = require("uuid");

  return function socket(ws, _req) {
    ws.id = uuidv4();

    ws.on("message", (msg) => {
      msg = JSON.parse(msg);

      switch (msg.method) {
        case "buy":
          aWss.clients.forEach((client) => {
            if (client.id !== ws.id) {
              client.send(JSON.stringify({ method: "update" }));
            }
          });
          break;
      }
    });
  };
};
