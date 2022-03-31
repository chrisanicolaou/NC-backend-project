const {
  fetchArticles,
  fetchArticleById,
  updateArticleById,
} = require("../models/articles.model");
const { articleIdChecker } = require("../models/helpers/model-utils");

exports.getArticles = async (req, res, next) => {
  try {
    const result = await fetchArticles();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    await articleIdChecker(article_id);
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
    await articleIdChecker(article_id);
    const result = await updateArticleById(article_id, inc_votes);
    res.send(result);
  } catch (err) {
    next(err);
  }
};
