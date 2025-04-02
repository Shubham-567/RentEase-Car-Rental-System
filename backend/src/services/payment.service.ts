import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Razorpay order
export const createOrder = async (amount: number, currency: string = "INR") => {
  try {
    const options = {
      amount: amount * 100, // Converting paise (500 Inr = 50000 paise)
      currency,
      receipt: "order_rcpt_" + Date.now(),
      payment_capture: 1, // Auto capture payment
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw new Error("Error creating Razorpay order");
  }
};

// verifying payment signature
export const verifyPayment = (
  order_id: string,
  payment_id: string,
  signature: string
): boolean => {
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(order_id + "|" + payment_id)
    .digest("hex");

  return generatedSignature === signature;
};
