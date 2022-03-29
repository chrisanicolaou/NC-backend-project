const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticleById,
  patchArticleById,
} = require("./controllers/articles.controller");
// const { getTopics, getArticleById } = require("./controllers/app-controllers");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticleById);

app.use((err, req, res, next) => {
  const badReqCodes = ["42703", "22P02", "23502"];
  if (badReqCodes.includes(err.code)) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.msg) {
    res.status(404).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

module.exports = { app };
