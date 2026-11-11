const pool = require("../db");

exports.getAllPosts = async function (req, res) {
    const page = Number(req.query.page) || 1;
    const keyword = req.query.keyword || "";
    const limit = 6;
    const offset = (page - 1) * limit;

    try {
        let query = `
            SELECT posts.*, users.username
            FROM posts
            LEFT JOIN users ON posts.user_id = users.id
        `;
        let countQuery = "SELECT COUNT(*) as total FROM posts";
        let values = [];
        let countValues = [];

        if (keyword) {
            query += " WHERE posts.title ILIKE $1";
            countQuery += " WHERE title ILIKE $1";
            values.push(`%${keyword}%`);
            countValues.push(`%${keyword}%`);
        }

        query += `
            ORDER BY posts.id DESC
            LIMIT $${values.length + 1} OFFSET $${values.length + 2}
        `;
        values.push(limit, offset);

        const postResult = await pool.query(query, values);
        const countResult = await pool.query(countQuery, countValues);

        const totalPosts = parseInt(countResult.rows[0].total);
        const totalPages = Math.ceil(totalPosts / limit);

        res.json({
            data: postResult.rows, // 👈 改回前端需要的 data
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalPosts // 前端可能用的是 totalItems
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "获取文章失败" });
    }
};

exports.createPost = async function (req, res) {
    const post = req.body;
    try {
        // 👈 用 RETURNING id 拿新生成的 ID
        const info = await pool.query(
            "INSERT INTO posts (title, summary, date, user_id) VALUES ($1, $2, $3, $4) RETURNING id",
            [post.title, post.summary, post.date, req.user.userId]
        );

        res.json({
            message: "收到文章",
            id: info.rows[0].id // 👈 从 rows[0] 里拿
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "发布失败" });
    }
};

exports.deletePost = async function (req, res) {
    const id = Number(req.params.id);
    try {
        const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        const post = result.rows[0]; // 👈 拿第一行数据

        if (!post) {
            return res.status(404).json({ error: "文章不存在" });
        }
        if (post.user_id !== req.user.userId) {
            return res.status(403).json({ error: "你没有权限删除别人的文章" });
        }

        await pool.query("DELETE FROM posts WHERE id = $1", [id]);
        res.json({ message: "已删除" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "删除失败" });
    }
};

exports.getPost = async function (req, res) {
    const id = Number(req.params.id);
    try {
        const result = await pool.query(
            "SELECT posts.*, users.username FROM posts LEFT JOIN users ON posts.user_id = users.id WHERE posts.id = $1",
            [id]
        );

        const post = result.rows[0]; // 👈 拿第一行

        if (!post) {
            return res.status(404).json({ err: "找不到" });
        }
        res.json(post); // 返回单篇文章对象
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "获取失败" });
    }
};

exports.editPost = async function (req, res) {
    const id = Number(req.params.id);
    const { title, summary, date } = req.body;
    try {
        const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        const post = result.rows[0]; // 👈 拿第一行

        if (!post) {
            return res.status(404).json({ error: "文章不存在" });
        }
        if (post.user_id !== req.user.userId) {
            return res.status(403).json({ error: "你没有权限编辑别人的文章" });
        }

        await pool.query(
            "UPDATE posts SET title = $1, summary = $2, date = $3 WHERE id = $4",
            [title, summary, date, id]
        );

        res.json({ message: "更新成功" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "更新失败" });
    }
};
