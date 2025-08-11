import express from "express";
import { createPaymentIntent } from "../../controller/payment/payment.controller.js";
const router = express.Router();

router.post("/create-payment-intent/:id", createPaymentIntent);

export default router;
