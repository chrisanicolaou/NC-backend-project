const db = require("../db/connection");

exports.getTopicsData = async () => {
  const queryResult = await db.query(`SELECT * FROM topics;`);
  return queryResult.rows;
};
