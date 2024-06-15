const express = require("express");
const {
  createSuperUser,
  deleteSuperUser,
  getSuperUsers,
  login,
  logout,
} = require("../controllers/superUser.controller");
const { isLoggedInSuperUser, checkRole } = require("../middlewares/user");
const { superUserRoles } = require("../models/superUser.model");

const router = express.Router();

// Route for retrieving all sub-admins (super users)
router
  .route("/")
  .get(getSuperUsers)
  .post(isLoggedInSuperUser, checkRole(superUserRoles.ADMIN), createSuperUser);
router.route("/:id").delete(deleteSuperUser);

router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
