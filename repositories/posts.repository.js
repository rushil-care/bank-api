const { PostsSchema } = require("../models/posts.model");

const getPosts = async (data) => {
    let skip = parseInt(data.skip) * 10;
    const response = await PostsSchema.find({}, {}, { skip: skip, limit: 10 });
    return response;
};

module.exports = {
    getPosts,
};
