const express = require("express");

const { 
    createUser,
    loginUser,
    getUserInfo,
    deleteUser
 } = require("../controllers/authController");

 const { protected } = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/new", createUser);
router.post("/login", loginUser);
router.get('/getuser', protected, getUserInfo);
router.delete("/remove/:id", deleteUser);

module.exports = router;
