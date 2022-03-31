const db = require("../../db/connection");

exports.articleIdChecker = async (articleId) => {
  try {
    const checker = await db.query(
      `SELECT * FROM articles WHERE article_id = $1`,
      [articleId]
    );
    if (checker.rows.length == 0)
      return Promise.reject({ status: 404, msg: "Article not found" });
  } catch (err) {
    return Promise.reject(err);
  }
};
