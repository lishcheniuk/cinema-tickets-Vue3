// const WS_URL = "wss://cinema-tickets.vercel.app/socket";

const socket = new WebSocket('ws://localhost:3000/socket');

let listens: Array<(param: string) => void> = [];

socket.addEventListener("message", (msg) => {
    const data = JSON.parse(msg.data);
    listens.forEach((fn) => fn(data.method));
});

export function subscribeToUpdate(cb: (param: string) => void) {
    listens.push(cb);
}

export function unsubscribeFromUpdate(cb: (param: string) => void) {
    listens = listens.filter(func => func !== cb);
}

export function socketSendMessage(message: { method: string }) {
    const msg = JSON.stringify(message);

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(msg);
        return;
    }
    socket.addEventListener(
        "open",
        () => {
            socket.send(msg);
        },
        { once: true }
    );
}
