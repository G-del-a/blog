const express = require("express");
const path = require("path");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { error } = require("console");
const { json } = require("stream/consumers");
const SECRET_KEY = "my_super_secret_key";

function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({ error: "未登陆，请先登陆"});
    }

    jwt.verify(token,SECRET_KEY, function(err, user){
        if(err){
            return res.status(403).json({ error: "登陆已过期，请重新登陆"});
        }

        req.user = user;
        next();
    });
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,"public")));

app.get("/posts",function(req,res){
    const posts = db.prepare(`
        SELECT posts.*, users.username
        FROM posts
        LEFT JOIN users ON posts.user_id = users.id
    `).all();
    res.json(posts);
});

app.get("/posts/:id",function(req,res){
    const id = Number(req.params.id);
    const post = db.prepare(`
        SELECT posts.*, users.username
        FROM posts
        LEFT JOIN users ON posts.user_id = users.id
        WHERE id = ?
        `).get(id);

    if(!post){
        return res.status(404).json({err:"找不到"});
    }
    res.json(post);
})

app.post("/posts",authenticateToken, function(req,res){
    const post = req.body;

    const info = db
        .prepare("INSERT INTO posts (title, summary, date, user_id) VALUES (?,?,?,?)")
        .run(post.title, post.summary, post.date, req.user.userId);

    res.json({
        message:"收到文章",
        id: info.lastInsertRowid
    });
})

app.post("/register",async function (req, res) {
    const { username,password } = req.body;

    if (!username || !password) {
        return res.status(400).json({error:"用户名和密码不能为空"});
    }
    
    try {
        const existingUser = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
         
        if (existingUser) {
            return res.status(400).json({error:"用户已存在"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const info = db.prepare("INSERT INTO users (username,password) VALUES (?,?)").run(username,hashedPassword);

        res.json({message:"注册成功",userId:info.lastInsertRowid});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"服务器内部错误"});
    }
});

app.post("/login",async function (req,res) {
    if (!req.body){
        return res.status(400).json({error:"请求体为空"});
    }
    const { username,password} = req.body;

    if (!username || !password){
        return res.status(400).json({error:"用户名和密码不能为空"});
    }

    try{
        const user = db.prepare("SELECT * FROM users WHERE username = ? ").get(username);
        if (!user){
            return res.status(400).json({error:"用户名或密码错误"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(400).json({error:"用户名或密码错误"});
        }

        const token = jwt.sign(
            {userId:user.id,user:username},
            SECRET_KEY,
            {expiresIn:"1d"}
        );

        res.json({message:"登陆成功",token,username:user.username});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"服务器内部错误"});
    }
});

app.delete("/posts/:id", authenticateToken, function(req,res){
    const id = Number(req.params.id);

    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
    if (!post){
        return res.status(404).json({ error: "文章不存在"});
    }

    if (post.user_id !== req.userId){
        return res.status(403).json({ error: "你没有权限删除别人的文章"});
    }

    db.prepare("DELETE FROM posts WHERE id = ?").run(id);
    res.json({message:"已删除"});
});

app.use(function(req,res){
    res.sendFile(path.join(__dirname,"public","index.html"));
})
app.listen(3000,function(){
    console.log("Express 启动了：http://localhost:3000");
});
