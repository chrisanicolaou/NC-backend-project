const db = require("../db/connection");

exports.getTopicsData = async () => {
  const queryResult = await db.query(`SELECT * FROM topics;`);
  return queryResult.rows;
};

exports.getArticle = async (articleId) => {
  try {
    const queryResult = await db.query(
      `SELECT * FROM articles WHERE article_id = $1`,
      [articleId]
    );
    if (queryResult.rows.length === 0) {
      return Promise.reject({ msg: "Article not found" });
    }
    return queryResult.rows[0];
  } catch (err) {
    return Promise.reject(err);
  }
};
