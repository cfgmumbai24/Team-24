const express = require("express");
const {
  createProductRequestByClusterUser,
  getAllProductRequest,
  getAllProductRequestForClusterUser,
  getAllProductRequestForSubAdmin,
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
  )
  .get(isLoggedInSuperUser, getAllProductRequest);

router
  .route("/cluster-user")
  .get(
    isLoggedInSuperUser,
    checkRole(superUserRoles.CLUSTER_USER),
    getAllProductRequestForClusterUser
  );

router
  .route("/sub-admin")
  .get(
    isLoggedInSuperUser,
    checkRole(superUserRoles.SUB_ADMIN),
    getAllProductRequestForSubAdmin
  );

module.exports = router;
