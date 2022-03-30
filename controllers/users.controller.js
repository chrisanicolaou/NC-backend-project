const res = require("express/lib/response");
const { fetchUsers } = require("../models/users.model");

exports.getUsers = async (req, res, next) => {
  const users = await fetchUsers();
  res.send(users);
};
