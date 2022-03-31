const db = require("../../db/connection");

exports.articleIdChecker = async (articleId) => {
  const checker = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [articleId]
  );
  if (checker.rows.length == 0)
    return Promise.reject({ status: 404, msg: "Article not found" });
};

exports.commentPostChecker = async (commentToPost) => {
  const { username } = commentToPost;
  const { body } = commentToPost;
  if (typeof body !== "string" || typeof username !== "string") {
    return Promise.reject({ code: "42703" });
  }
};
