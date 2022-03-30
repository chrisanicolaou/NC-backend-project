const db = require("../db/connection");

exports.fetchArticleById = async (articleId) => {
  try {
    const queryResult = await db.query(
      `SELECT * FROM articles WHERE article_id = $1`,
      [articleId]
    );
    if (queryResult.rows.length === 0) {
      return Promise.reject({ msg: "Article not found", status: 404 });
    }
    return queryResult.rows[0];
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.updateArticleById = async (articleId, numToIncrement) => {
  try {
    const queryResult = await db.query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [numToIncrement, articleId]
    );
    if (queryResult.rows.length === 0) {
      return Promise.reject({ msg: "Article not found", status: 404 });
    }
    return queryResult.rows[0];
  } catch (err) {
    return Promise.reject(err);
  }
};
