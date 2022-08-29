const express = require("express");
const MongoClient = require("mongodb").MongoClient;
//const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();
const WSServer = require("express-ws")(app);

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(express.json({ extended: true }));

app.ws("/socket", require("./websocket")(WSServer));
app.use("/api/films", require("./routes/films.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.get("*", (_req, res) => res.send("It works!"));

function start() {
    const client = new MongoClient(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    client.connect((err) => {
        if (err) return console.log('error conncect db', err);
        app.locals.db = client.db("cinema_tickets");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });

    process.on("SIGINT", () => {
        client.close();
        process.exit();
    });
}

start();
