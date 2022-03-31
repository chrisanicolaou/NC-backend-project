const db = require("../db/connection");

exports.fetchArticles = async () => {
  try {
    const queryResult = await db.query(
      `SELECT articles.*, COUNT(comments.article_id) :: INT AS comment_count
      FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
      GROUP BY articles.article_id;`
    );
    return queryResult.rows;
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.fetchArticleById = async (articleId) => {
  try {
    const queryResult = await db.query(
      `SELECT articles.*, COUNT(comments.article_id) :: INT AS comment_count 
      FROM articles JOIN comments ON articles.article_id = comments.article_id 
      WHERE articles.article_id = $1 
      GROUP BY articles.article_id;`,
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
