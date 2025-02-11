const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize')
const { 
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deactivateUser,
    activateUser,
    forgotPassword,
    resetPassword
} = require("../controllers/user");

router.post("/register", registerUser); // Register
router.post("/login", loginUser); // Login
router.get('/profile', authenticate, getUserProfile); // Get Profile
router.put("/profile", authenticate, updateUserProfile); // Update Profile
router.put("/:id/deactivate", authenticate, authorize, deactivateUser); // Deactivate
router.put("/:id/activate", authenticate, authorize, activateUser); // Activate
router.post("/forgot-password", forgotPassword); // Forgot Password
router.post("/reset-password", resetPassword); // Reset Password

module.exports = router;

