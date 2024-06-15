const express = require("express");
const {
   createUser,
   deleteSuperUser,
   getSuperUsers
} = require("../controllers/superUser.controller");

const router = express.Router();

// Route for retrieving all sub-admins (super users)
router.get('/sub-admins', getSuperUsers);

// Route for creating a new sub-admin (super user)
router.post('/sub-admins', createUser);

// Route for deleting a sub-admin (super user) by ID
router.delete('/sub-admins/:id', deleteSuperUser);

module.exports = router;
