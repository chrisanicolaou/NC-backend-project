const { fetchArticleById } = require("../models/articles.model");

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const result = await fetchArticleById(article_id);
    res.send(result);
  } catch (err) {
    next(err);
  }
};
