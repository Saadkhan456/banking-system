const db = require("../config/db");

const User = {
  findByUsername: (username, callback) => {
    db.query("SELECT * FROM users WHERE username = ?", [username], callback);
  },
};

module.exports = User;
