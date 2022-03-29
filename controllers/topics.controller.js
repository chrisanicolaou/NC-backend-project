const { fetchTopics } = require("../models/topics.model");

exports.getTopics = async (req, res, next) => {
  const result = await fetchTopics();
  res.send(result);
};
