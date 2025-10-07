import express from "express";
import { sendOtp, verifyOtpController, resetPassword } from "../controllers/otpController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpController );
router.post("/reset-password", resetPassword );


export default router;