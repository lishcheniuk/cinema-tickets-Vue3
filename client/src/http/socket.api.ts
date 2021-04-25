const WS_URL = "wss://cinema-tickets-server.vercel.app/socket";

const socket = new WebSocket(WS_URL);

let listens = [] as Array<(param: string) => void>;

socket.addEventListener("message", (msg) => {
  const data = JSON.parse(msg.data);
  listens.forEach((fn) => fn(data.method));
});

export function subscribeToUpdate(cb: (param: string) => void) {
  listens.push(cb);
}

export function unsubscribeFromUpdate() {
  listens = [];
}

export function socketSendMessage(message: { method: string }) {
  const msg = JSON.stringify(message);
  socket.send(msg);
}
