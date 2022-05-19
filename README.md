# Welcome to my backend project!

## An API that serves endpoints for a front end that will mimic the functionality of Reddit

---

---

## Table of contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [Limitations](#limitations)

---

---

## Overview

As a part of my studies at Northcoders, I was tasked with building an API for the purpose of accessing application data programmatically. The intention is to mimic the building of a real world backend service, gaining practical insight into the required workflows that will be common in the workplace.

**This API is hosted on [Heroku](https://www.heroku.com), and can be viewed online using [this URL](https://nc-backend-project.herokuapp.com/api). Alternatively, if you would like to run the test suite locally, please follow the [setup](#setup) instructions.**

---

---

## Setup

**Prerequisite**: [Node](https://nodejs.org/en/) (version 16 or above), [PostgreSQL](https://www.postgresql.org/) (version 12 or above)

After cloning the repo, first install the project's dependencies:

`npm install`

This repo contains 2 databases for test and dev data. In order to connect to the two databases, .env files must be created. In the root directory, create a .env.test file, and include the following:

`PGDATABASE=nc_news_test`

Next, create a .env.development file, and include the following:

`PGDATABASE=nc_news`

The jest test suite can now be run using `npm test`!

Additionally, if you wanted to view the test database, you can run:

`npm run view-data`

Which will print the test data to a "testdata.txt" file.

---

---

## Limitations

Building this project from start to finish within 4 days proved to be challenging. Given more time, I would have liked to explore the following concepts in this project:

[**Express Routers**](https://expressjs.com/en/guide/routing): While still a relatively small project, having an opportunity to use express routers to create modular route handlers would have helped me to understand how to create more maintainable (and readable) servers.

**Pagination**: Learning how to paginate data on the backend using queries is invaluable and I would have loved the opportunity to implement this.
