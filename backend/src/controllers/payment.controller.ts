import { Request, Response } from "express";
import { createOrder, verifyPayment } from "../services/payment.service.js";

// Creating a Payment Request
export const createPaymentOrder = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      res.status(400).json({ message: "Amount is required" });
      return;
    }

    const order = await createOrder(amount);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// verifying the if Payment is success or failed
export const verifyPaymentSignature = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400).json({ message: "Invalid payment details" });
    }

    const isValidPayment = verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (isValidPayment) {
      res.json({ success: true, message: "Payment verified successfully" });

      return;
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
