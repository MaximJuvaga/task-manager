const express = require("express");
const router = express.Router();

const{register,login,getProfile}=require("../controllers/auth.controller")
const{validateRegister,validateLogin,handleValidationErrors}=require("../middleware/validation.midleware")
const authMiddleware = require("../middleware/auth.middleware")


router.post(
    "/register",
    validateRegister,
    handleValidationErrors,
    register
)

router.post(
    "/login",
    validateLogin,
    handleValidationErrors,
    login
)
router.get(
    "/profile",
    authMiddleware,
    getProfile
)

module.exports = router;