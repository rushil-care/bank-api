const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/connection.mongo");
mongoose.pluralize(null);

const modelA = new Schema(
    {
        account_no: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    { versionKey: false }
);

var SavingsSchema = conn.model("savings_acs", modelA);
var CurrentSchema = conn.model("current_acs", modelA);
var BasicSavingsSchema = conn.model("basic_savings_acs", modelA);

const modelB = new Schema(
    {
        account_no: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        ac_type: {
            type: String,
            required: true,
        },
    },
    { versionKey: false }
);

var GlobalACSchema = conn.model("global_acs", modelB);

module.exports = {
    SavingsSchema,
    CurrentSchema,
    BasicSavingsSchema,
    GlobalACSchema,
};
