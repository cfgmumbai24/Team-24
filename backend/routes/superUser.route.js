const express = require("express");
const {
  createSuperUser,
  deleteSuperUser,
  getSuperUsers,
  login,
  logout,
} = require("../controllers/superUser.controller");

const router = express.Router();

// Route for retrieving all sub-admins (super users)
router.route("/").get(getSuperUsers).post(createSuperUser);
router.route("/:id").delete(deleteSuperUser);

router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
