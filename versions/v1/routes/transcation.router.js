const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transcation.controller");

router.post("/", TransactionController.createTranscation);

module.exports = router;
