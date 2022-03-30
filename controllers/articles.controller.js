const {
  fetchArticleById,
  updateArticleById,
} = require("../models/articles.model");

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const result = await fetchArticleById(article_id);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.patchArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    const result = await updateArticleById(article_id, inc_votes);
    res.send(result);
  } catch (err) {
    next(err);
  }
};