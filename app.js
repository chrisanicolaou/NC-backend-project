const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticleById,
  patchArticleById,
} = require("./controllers/articles.controller");

app.use(express.json());

//TOPICS

app.get("/api/topics", getTopics);

//ARTICLES

app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticleById);

//USERS

//COMMENTS

//ERROR HANDLERS:

//Handles PSQL errors
app.use((err, req, res, next) => {
  const badReqCodes = ["42703", "22P02", "23502"];
  if (badReqCodes.includes(err.code)) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

//Handles custom errors
app.use((err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

//Handles incorrect paths
app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

module.exports = { app };
