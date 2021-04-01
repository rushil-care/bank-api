const PostsService = require("../../../services/posts.service");

const getPosts = async (req, res) => {
    try {
        const params = req.params;
        const queryParams = req.query;
        const bodyParams = req.body;
        const token = req.token;
        const response = await PostsService.getPosts({
            ...params,
            ...queryParams,
            ...bodyParams,
            ...token,
        });
        return res.status(200).send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

module.exports = {
    getPosts,
};
