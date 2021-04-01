const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/connection.mongo");
mongoose.pluralize(null);

const modelA = new Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        accounts: {
            type: Array,
            required: false,
        },
        acc_nos: {
            type: Array,
            required: false,
        },
    },
    { versionKey: false }
);

var Userschema = conn.model("users", modelA);

module.exports = {
    Userschema,
};
