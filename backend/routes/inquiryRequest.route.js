const express = require("express");

const { isLoggedInUser } = require("../middlewares/user");
const { sendInquiryEmail } = require("../controllers/inquiryRequest.controller");
const router = express.Router();

router
  .route("/")
  .post(
    isLoggedInUser,
    sendInquiryEmail
  );

module.exports = router;
