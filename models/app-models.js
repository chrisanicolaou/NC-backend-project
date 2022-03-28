const db = require("../db/connection");

exports.getTopicsData = () => {
  console.log("in model");
  return db.query(`SELECT * FROM topics;`).then((results) => {
    console.log(results.rows);
    return results.rows;
  });
};
