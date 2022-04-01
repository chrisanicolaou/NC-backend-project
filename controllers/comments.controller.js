const {
  fetchCommentsByArticleId,
  sendCommentByArticleId,
  removeCommentById,
} = require("../models/comments.model.js");
const {
  articleIdChecker,
  commentPostChecker,
  commentIdChecker,
} = require("../models/helpers/model-utils");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    await articleIdChecker(article_id);
    const results = await fetchCommentsByArticleId(article_id);
    res.send(results);
  } catch (err) {
    next(err);
  }
};

exports.postCommentByArticleId = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const commentToSend = req.body;
    await commentPostChecker(commentToSend);
    await articleIdChecker(article_id);
    const results = await sendCommentByArticleId(article_id, commentToSend);
    res.send(results);
  } catch (err) {
    next(err);
  }
};

exports.deleteCommentById = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    await commentIdChecker(comment_id);
    await removeCommentById(comment_id);
    res.status(204).send({});
  } catch (err) {
    next(err);
  }
};
