import express from "express";
import {
  createPaymentOrder,
  verifyPaymentSignature,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", createPaymentOrder);
router.post("/verify-payment", verifyPaymentSignature);

export default router;
