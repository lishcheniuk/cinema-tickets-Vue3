const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const startSocket = require("./socket");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

//app.use(cors());
app.use(express.json({ extended: true }));

startSocket(app);

app.get("/", (_req, res) => res.send("Home Page Route"));
app.use("/api/films", require("./routes/films.route"));
app.use("/api/auth", require("./routes/auth.route"));

function start() {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    if (err) return console.log(err);
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
