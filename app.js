const express = require("express");
const app = express();
const { getTopics } = require("./controllers/app-controllers");

app.use(express.json());

app.get("/api/topics", getTopics);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

module.exports = { app };
