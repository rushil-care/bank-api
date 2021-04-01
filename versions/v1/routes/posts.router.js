const express = require("express");
const router = express.Router();
const PostController = require("../controllers/posts.controller");

router.get("/", PostController.getPosts);

module.exports = router;
