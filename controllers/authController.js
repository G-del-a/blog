const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");       
const db = require("../db");              
const SECRET_KEY = process.env.SECRET_KEY; 


exports.regist = async function(req,res){
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
};

exports.login = async function(req,res){
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
}

