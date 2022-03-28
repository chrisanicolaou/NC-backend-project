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
  test("Returns with an array of topic objects, each with slug and description properties", () => {
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
  test("Returns with 404 when given the incorrect path", () => {
    return request(app)
      .get("/api/popics")
      .expect(404)
      .then((results) => {
        expect(results.body.msg).toEqual("Path not found");
      });
  });
});
