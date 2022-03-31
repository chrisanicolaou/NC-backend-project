const db = require("../db/connection");

exports.fetchCommentsByArticleId = async (articleId) => {
  try {
    const queryResult = await db.query(
      `SELECT comment_id, body, author, votes, created_at FROM comments WHERE article_id = $1`,
      [articleId]
    );
    if (queryResult.rows.length === 0)
      return Promise.reject({ status: 404, msg: "No comments found" });
    return queryResult.rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
