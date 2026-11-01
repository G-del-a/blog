const express = require('express');
const router = express.Router();
const postController = require("../controllers/postController.js");

const { authenticateToken} = require("../middlewares/auth.js");

router.get("/", postController.getAllPosts);
router.post("/", authenticateToken, postController.createPost);
router.get("/:id", postController.getPost);
router.put("/:id", authenticateToken, postController.editPost);
router.delete("/:id", authenticateToken, postController.deletePost);

module.exports = router;
