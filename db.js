const Database = require("better-sqlite3");

const db = new Database("blog.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        summary TEXT,
        date TEXT
    )
    `);

module.exports = db;