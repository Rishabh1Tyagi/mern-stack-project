const express = require("express");

const router = express.Router();

router.use("/contact", require("../controller/contactInfo.controller"));

module.exports = router;
