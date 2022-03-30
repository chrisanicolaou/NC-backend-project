const db = require("../db/connection");

exports.fetchUsers = async () => {
  const queryRes = await db.query("SELECT username FROM users;");
  return queryRes.rows;
};
