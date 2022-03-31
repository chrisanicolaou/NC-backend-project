const db = require("../db/connection");

exports.fetchCommentsByArticleId = async (articleId) => {
  try {
    const queryResult = await db.query(
      `SELECT comment_id, body, author, votes, created_at FROM comments WHERE article_id = $1`,
      [articleId]
    );
    if (queryResult.rows.length === 0)
      return Promise.reject({ status: 200, msg: "No comments found" });
    return queryResult.rows;
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.sendCommentByArticleId = async (articleId, commentToSend) => {
  try {
    const queryResult = await db.query(
      `INSERT INTO comments
    (body, article_id, author, votes)
    VALUES
    ($1, $2, $3, 0)
    RETURNING *;`,
      [commentToSend.body, articleId, commentToSend.username]
    );
    return queryResult.rows[0];
  } catch (err) {
    return Promise.reject(err);
  }
};
