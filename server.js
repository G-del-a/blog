const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "posts.json");

const server = http.createServer(function (req, res) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if(req.method === "OPTIONS"){
        res.statusCode = 204;
        res.end();
        return;
    }
    if (req.method === "GET" && req.url === "/posts") {
        const posts = readPosts();
        res.end(JSON.stringify(posts));
        return;
    }

    if (req.method === "DELETE" && req.url.startsWith("/posts/")) {
        const id = Number(req.url.split("/")[2]);

        const posts = readPosts();
        const newPosts = posts.filter(function (p) {
            return p.id !== id;
        });

        writePosts(newPosts);
        res.end(JSON.stringify({ message: "已删除" }));
        return;
    }

    if (req.method === "POST" && req.url === "/posts") {
        let body = "";

        req.on("data", function (chunk) {
            body = body + chunk;
        });

        req.on("end", function () {
            console.log(`收到的原始数据:${body}`);

            const post = JSON.parse(body);
            console.log(`解析后的数据:${post}`);

            post.id = Date.now();

            const posts = readPosts();
            posts.push(post);
            writePosts(posts);

            res.end(JSON.stringify({ message: "收到文章", post: post }));
        });
        return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ error: "找不到" }));
});

function readPosts() {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

function writePosts(posts) {
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2))
}

server.listen(3000, function () {
    console.log("服务器启动了：http://localhost:3000");
})