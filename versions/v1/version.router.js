const express = require("express");
const router = express.Router();
const PostsRouter = require("./routes/posts.router");
const UserRouter = require("./routes/users.router");
const TranscationRouter = require("./routes/transcation.router");

router.get("/", function (req, res) {
    res.status(200).send({ status: "success", message: "API is working fine." });
});

//All Route Paths

router.use("/posts", PostsRouter);
router.use("/user", UserRouter);
router.use("/transfer", TranscationRouter);

module.exports = router;
