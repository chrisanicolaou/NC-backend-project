const { fetchCommentsByArticleId } = require("../models/comments.model.js");
const { articleIdChecker } = require("../models/helpers/model-utils");

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
