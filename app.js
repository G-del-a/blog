require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/posts", postRoutes);
app.use("/", authRoutes);
app.get("/api/version", function (req, res) {
    res.json({ version: "1.0.0", author: "gwc" });
});

app.use(function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})
app.listen(PORT, function () {
    console.log(`Express 启动了：http://localhost:${PORT}`);
});
