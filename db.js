const {DatabaseSync} = require("node:sqlite");

const db = new DatabaseSync("blog.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        summary TEXT,
        date TEXT
    )
    `);

module.exports = db;