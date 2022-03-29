const { getTopicsData } = require("../models/app-models");

exports.getTopics = async (req, res, next) => {
  const result = await getTopicsData();
  res.send(result);
};
