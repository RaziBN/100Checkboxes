const session = require("express-session");

module.exports = session({
  secret: "mySecretKey",
  resave: true,
  saveUninitialized: true,
});
