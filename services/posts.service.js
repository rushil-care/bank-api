const PostsRepository = require("../repositories/posts.repository");

const getPosts = async (params) => {
    const response = await PostsRepository.getPosts(params);
    if (response) {
        return { status: 1, message: "Posts fetched Successfully!!", data: response };
    } else {
        return { status: 0, message: "Posts could not be fetched!!" };
    }
};

module.exports = {
    getPosts,
};
