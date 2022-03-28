const { getTopicsData } = require("../models/app-models");

exports.getTopics = (req, res, next) => {
  getTopicsData().then((topicsData) => {
    res.status(200).send(topicsData);
  });
};
