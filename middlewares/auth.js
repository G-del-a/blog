const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

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

module.exports = {authenticateToken};
