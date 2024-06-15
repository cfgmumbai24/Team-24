const express = require("express");
const {
  createProductRequestByClusterUser,
} = require("../controllers/productRequest.controller");
const { isLoggedInSuperUser, checkRole } = require("../middlewares/user");
const { superUserRoles } = require("../models/superUser.model");
const router = express.Router();

router
  .route("/")
  .post(
    isLoggedInSuperUser,
    checkRole(superUserRoles.CLUSTER_USER),
    createProductRequestByClusterUser
  );

module.exports = router;
