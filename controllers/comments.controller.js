const { fetchCommentsByArticleId } = require("../models/comments.model.js");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const results = await fetchCommentsByArticleId(article_id);
    res.send(results);
  } catch (err) {
    next(err);
  }
};
