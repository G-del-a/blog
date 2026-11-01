const db = require("../db");

exports.getAllPosts = function(req, res) {
    const page = Number(req.query.page) || 1;
    const keyword = req.query.keyword || "";
    const limit = 6;
    const offset = (page -1) * limit;

    const limitBigInt  = BigInt(limit);
    const offsetBigInt = BigInt(offset);

    let whereClause = "";
    let queryParams = [limitBigInt, offsetBigInt];
    let countParams = [];

    if (keyword) {
        whereClause = /*sql*/`WHERE posts.title LIKE ?`;
        const searchPattern = `%${keyword}%`;
        queryParams = [searchPattern, limitBigInt, offsetBigInt];
        countParams = [searchPattern];
    }

    const sql = /*sql*/`
        SELECT posts.*, users.username
        FROM   posts 
        LEFT JOIN users ON posts.user_id = users.id
        ${whereClause}
        ORDER BY posts.id DESC
        LIMIT ? OFFSET ?
        `;

    const posts = db.prepare(sql).all(...queryParams);

    const countSql = /*sql*/`SELECT COUNT(*) as count FROM posts ${whereClause}`;
    const totalResult = db.prepare(countSql).get(...countParams);
    const total = totalResult.count;
    const totalPages = Math.ceil(total/ limit);
    
    res.json({
        data:posts,
        pagination:{
            currentPage: page,
            totalPages:totalPages,
            totalItems:total
        }
    });
}

// 👈 拼写修正为 createPost
exports.createPost = function(req, res) {
    const post = req.body;
    const info = db
        .prepare("INSERT INTO posts (title, summary, date, user_id) VALUES (?,?,?,?)")
        .run(post.title, post.summary, post.date, req.user.userId);

    res.json({
        message: "收到文章",
        id: info.lastInsertRowid
    });
}

exports.deletePost = function(req, res) {
    const id = Number(req.params.id);

    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
    if (!post) {
        return res.status(404).json({ error: "文章不存在" });
    }

    // 👈 修正 req.user.userId
    if (post.user_id !== req.user.userId) {
        return res.status(403).json({ error: "你没有权限删除别人的文章" });
    }

    db.prepare("DELETE FROM posts WHERE id = ?").run(id);
    res.json({ message: "已删除" });
}

exports.getPost = function(req, res) {
    const id = Number(req.params.id);
    const post = db.prepare(/*sql*/`
        SELECT posts.*, users.username
        FROM posts
        LEFT JOIN users ON posts.user_id = users.id
        WHERE posts.id = ?
    `).get(id);

    if (!post) {
        return res.status(404).json({ err: "找不到" });
    }
    res.json(post);
}

exports.editPost = function(req, res) {
    const id = Number(req.params.id);
    const { title, summary, date } = req.body;

    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
    if (!post) {
        return res.status(404).json({ error: "文章不存在" });
    }

    // 👈 修正 post.user_id 和 req.user.userId
    if (post.user_id !== req.user.userId) {
        return res.status(403).json({ error: "你没有权限编辑别人的文章" });
    }

    db.prepare("UPDATE posts SET title = ?, summary = ?, date = ? WHERE id = ?")
      .run(title, summary, date, id);

    res.json({ message: "更新成功" });
}
