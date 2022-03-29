const db = require("../db/connection");

exports.fetchTopics = async () => {
  const queryResult = await db.query(`SELECT * FROM topics;`);
  return queryResult.rows;
};
