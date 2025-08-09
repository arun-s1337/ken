// routes/authRoutes.js
import express from "express";
const router = express.Router();

import { checkToken,registerBusiness,registerUser,login,logout,forgotPassword,resetPassword,invitedRegisterUser } from "../controller/lms/auth-controller.js";

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/protected", checkToken);

router.post("/invited_register/:id",invitedRegisterUser)
router.post("/business_register", registerBusiness);

router.post("/forgot_password",forgotPassword)
router.post("/reset_password",resetPassword)

export default router;
