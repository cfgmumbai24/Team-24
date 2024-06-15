const express = require("express");
const {
  createProductRequestByClusterUser,
  getAllProductRequest,
  getAllProductRequestForClusterUser,
  getAllProductRequestForSubAdmin,
  approveProductRequestForSubAdmin,
  approveProductRequestForAdmin,
  rejectProductRequestForSubAdmin,
  rejectProductRequestForAdmin,
  getAllProductRequestForAdmin,
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

router
  .route("/sub-admin/:id/approve")
  .get(
    isLoggedInSuperUser,
    checkRole(superUserRoles.SUB_ADMIN),
    approveProductRequestForSubAdmin
  );

router
  .route("/sub-admin/:id/reject")
  .get(
    isLoggedInSuperUser,
    checkRole(superUserRoles.SUB_ADMIN),
    rejectProductRequestForSubAdmin
  );

router
  .route("/admin")
  .get(
    isLoggedInSuperUser,
    checkRole(superUserRoles.ADMIN),
    getAllProductRequestForAdmin
  );

router
  .route("/admin/:id/approve")
  .get(
    isLoggedInSuperUser,
    checkRole(superUserRoles.ADMIN),
    approveProductRequestForAdmin
  );

router
  .route("/admin/:id/reject")
  .get(
    isLoggedInSuperUser,
    checkRole(superUserRoles.ADMIN),
    rejectProductRequestForAdmin
  );

module.exports = router;
