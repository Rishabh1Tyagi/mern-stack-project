const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.get("/text", (req, res) => {
  res.send("Hello World!");
});

// require("./config/dbConnect");
const api = require("./routes/api");

app.use("/api", api);
app.use(cors());
app.options("*", cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Accept Authorization"
  );
  res.header("Access-Control-Expose-Headers", "*");
  next();
});

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
