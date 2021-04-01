const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/connection.mongo");
mongoose.pluralize(null);

const modelA = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        authors: {
            type: String,
            required: true,
        },
        average_rating: {
            type: Number,
            required: false,
        },
        bookID: {
            type: Number,
        },
    },
    { versionKey: false }
);

var PostsSchema = conn.model("posts", modelA);

module.exports = {
    PostsSchema,
};
