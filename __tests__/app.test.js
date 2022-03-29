const { app } = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

afterAll(() => {
  db.end();
});
beforeEach(() => {
  return seed(testData);
});

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
  test("200: Given a correct file path and existing article_id, returns an article object with the correct properties", () => {
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
