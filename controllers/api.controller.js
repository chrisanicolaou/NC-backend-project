const endpoints = require("../endpoints.json");

exports.getEndpoints = (req, res, next) => {
  res.send(endpoints);
};
