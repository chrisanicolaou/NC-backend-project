const { app } = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe("GET: /api/topics", () => {
  test("200: Returns with an array of topic objects, each with slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((results) => {
        expect(Array.isArray(results.body)).toEqual(true);
        results.body.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
        expect(results.body).toEqual(testData.topicData);
      });
  });
  test("404: Returns with 'Path not found' when given the incorrect path", () => {
    return request(app)
      .get("/api/popics")
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Path not found");
      });
  });
});

describe("GET: /api/articles/:article_id", () => {
  test("200: Given a correct file path and existing article_id, returns an article object with the correct properties, including a comment_count as a total number of comments for that article", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then((results) => {
        expect(results.body).toEqual(
          expect.objectContaining({
            article_id: 3,
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: 2,
          })
        );
      });
  });
  test("404: Given non-existent article_id, returns 'Article not found'", () => {
    return request(app)
      .get("/api/articles/300")
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Article not found");
      });
  });
  test("400: Given article_id of wrong type, returns 'Bad request'", () => {
    return request(app)
      .get("/api/articles/scoop")
      .expect(400)
      .then((results) => {
        expect(results.body.msg).toEqual("Bad request");
      });
  });
  test("404: Returns with 'Path not found' when given the incorrect path", () => {
    return request(app)
      .get("/api/notarticles/400")
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Path not found");
      });
  });
});

describe("PATCH: /api/articles/:article_id", () => {
  const voteToAdd = { inc_votes: 1 };
  test("200: Given req body in the correct format, returns article with the correctly updated votes property", () => {
    return request(app)
      .patch("/api/articles/1")
      .send(voteToAdd)
      .expect(200)
      .then((results) => {
        expect(results.body).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: 101,
          })
        );
      });
  });
  test("400: Given a req body of correct format but incorrect value type, returns 'Bad request'", () => {
    const badVote = { inc_votes: "seven-teen" };
    return request(app)
      .patch("/api/articles/1")
      .send(badVote)
      .expect(400)
      .then((results) => {
        expect(results.body.msg).toEqual("Bad request");
      });
  });
  test("400: Given a req body of incorrect format returns 'Bad request'", () => {
    const badVote = { mcfly: "Best band" };
    return request(app)
      .patch("/api/articles/1")
      .send(badVote)
      .expect(400)
      .then((results) => {
        expect(results.body.msg).toEqual("Bad request");
      });
  });
  test("404: Given non-existent article_id, returns 'Article not found'", () => {
    return request(app)
      .patch("/api/articles/300")
      .send(voteToAdd)
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Article not found");
      });
  });
  test("400: Given article_id of wrong type, returns 'Bad request'", () => {
    return request(app)
      .patch("/api/articles/scoop")
      .send(voteToAdd)
      .expect(400)
      .then((results) => {
        expect(results.body.msg).toEqual("Bad request");
      });
  });
  test("404: Returns with 'Path not found' when given the incorrect path", () => {
    return request(app)
      .patch("/api/notarticles/400")
      .send(voteToAdd)
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Path not found");
      });
  });
});

describe("GET: /api/users", () => {
  test("200: Returns with an array of user objects, each with just a username property", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((results) => {
        expect(Array.isArray(results.body)).toEqual(true);
        results.body.forEach((user) => {
          expect(user).toEqual({ username: expect.any(String) });
        });
      });
  });
  test("404: Returns with 'Path not found' when given the incorrect path", () => {
    return request(app)
      .get("/api/stusers")
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Path not found");
      });
  });
});

describe("GET: /api/articles", () => {
  test("200: Returns with an array of article objects, including author as username from users table and comment_count", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((results) => {
        expect(Array.isArray(results.body)).toEqual(true);
        expect(results.body.length).toEqual(12);
        results.body.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("404: Returns with 'Path not found' when given the incorrect path", () => {
    return request(app)
      .get("/api/starticles")
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Path not found");
      });
  });
});

describe("GET: /api/articles/:article_id/comments", () => {
  test("200: Given a correct file path and existing article_id, returns an array of comments of that article_id, each with the correct properties", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then((results) => {
        expect(results.body.length).toEqual(2);
        results.body.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          );
          expect(Object.keys(comment).length).toEqual(5);
        });
      });
  });
  test("404: Given non-existent article_id, returns 'Article not found'", () => {
    return request(app)
      .get("/api/articles/300/comments")
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Article not found");
      });
  });
  test("200: Given article_id with no comments, returns 'No comments found'", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((results) => {
        expect(results.body.msg).toEqual("No comments found");
      });
  });
  test("400: Given article_id of wrong type, returns 'Bad request'", () => {
    return request(app)
      .get("/api/articles/scoop/comments")
      .expect(400)
      .then((results) => {
        expect(results.body.msg).toEqual("Bad request");
      });
  });
  test("404: Returns with 'Path not found' when given the incorrect path", () => {
    return request(app)
      .get("/api/notarticles/4/comments")
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Path not found");
      });
  });
});

describe("POST: /api/articles/:article_id/comments", () => {
  const commentToAdd = {
    body: "This is a good comment",
    username: "butter_bridge",
  };
  test("200: Given req body in the correct format, returns the posted comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send(commentToAdd)
      .expect(200)
      .then((results) => {
        expect(results.body).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            body: expect.any(String),
            article_id: 1,
            author: "butter_bridge",
            votes: 0,
            created_at: expect.any(String),
          })
        );
      });
  });
  test("400: Given a req body of correct format but non-existent user, returns 'Bad request'", () => {
    const badComment = {
      body: "This is not a good comment",
      username: "chrislovespie",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(badComment)
      .expect(400)
      .then((results) => {
        expect(results.body.msg).toEqual("Bad request");
      });
  });
  test("400: Given a req body of correct format but incorrect value type, returns 'Bad request'", () => {
    const badComment = { body: 14, username: "butter_bridge" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(badComment)
      .expect(400)
      .then((results) => {
        expect(results.body.msg).toEqual("Bad request");
      });
  });
  test("400: Given a req body of incorrect format returns 'Bad request'", () => {
    const badComment = { mcfly: "Best band" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(badComment)
      .expect(400)
      .then((results) => {
        expect(results.body.msg).toEqual("Bad request");
      });
  });
  test("404: Given non-existent article_id, returns 'Article not found'", () => {
    return request(app)
      .post("/api/articles/300/comments")
      .send(commentToAdd)
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Article not found");
      });
  });
  test("400: Given article_id of wrong type, returns 'Bad request'", () => {
    return request(app)
      .post("/api/articles/scoop/comments")
      .send(commentToAdd)
      .expect(400)
      .then((results) => {
        expect(results.body.msg).toEqual("Bad request");
      });
  });
  test("404: Returns with 'Path not found' when given the incorrect path", () => {
    return request(app)
      .post("/api/notarticles/400/copmments")
      .send(commentToAdd)
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Path not found");
      });
  });
});

describe("DELETE: /api/comments/:comment_id", () => {
  test("204: Given a valid request, deletes the given comment and responds with 'no content'", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then((results) => {
        expect(results.body).toEqual({});
        return db.query(`SELECT * FROM comments WHERE comment_id = 1`);
      })
      .then((queryResults) => {
        expect(queryResults.rows).toEqual([]);
      });
  });
  test("404: Given non-existent comment_id, returns 'Comment not found'", () => {
    return request(app)
      .delete("/api/comments/300")
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Comment not found");
      });
  });
  test("400: Given comment_id of wrong type, returns 'Bad request'", () => {
    return request(app)
      .delete("/api/comments/scoop")
      .expect(400)
      .then((results) => {
        expect(results.body.msg).toEqual("Bad request");
      });
  });
  test("404: Returns with 'Path not found' when given the incorrect path", () => {
    return request(app)
      .delete("/api/complemments")
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Path not found");
      });
  });
});
