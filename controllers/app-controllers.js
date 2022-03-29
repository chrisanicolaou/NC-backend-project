const { getTopicsData, getArticle } = require("../models/app-models");

exports.getTopics = async (req, res, next) => {
  const result = await getTopicsData();
  res.send(result);
};

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const result = await getArticle(article_id);
    res.send(result);
  } catch (err) {
    next(err);
  }
};
