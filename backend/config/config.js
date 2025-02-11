require("dotenv").config({
  path: __dirname + "/../.env",
});

module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "javasea_mp",
    host: "localhost",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "root",
    database: "javasea_mp_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "root",
    database: "javasea_mp_prod",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};