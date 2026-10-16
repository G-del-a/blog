const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const db = require("./db");
const { execPath } = require("process");

const filePath = path.join(__dirname,"posts.json");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,"public")));

app.get("/posts",function(req,res){
    const posts = db.prepare("SELECT * FROM posts").all();
    res.json(posts);
});

app.get("/posts/:id",function(req,res){
    const id = Number(req.params.id);
    const post = db.prepare("SELECT * FROM posts WHERE id=?").get(id);

    if(!post){
        return res.status(404).json({err:"找不到"});
    }
    res.json(post);
})

app.post("/posts",function(req,res){
    const post = req.body;

    const info = db
        .prepare("INSERT INTO posts (title, summary, date) VALUES (?,?,?)")
        .run(post.title, post.summary, post.date);

    res.json({
        message:"收到文章",
        id: info.lastInsertRowid
    });
})

app.delete("/posts/:id",function(req,res){
    const id = Number(req.params.id);

    db.prepare("DELETE FROM posts WHERE id = ?").run(id);

    res.json({message:"已删除"});
});

app.use(function(res,req){
    res.sendFile(path.join(__dirname,"public","index.html"));
})
app.listen(3000,function(){
    console.log("Express 启动了：http://localhost:3000");
});
