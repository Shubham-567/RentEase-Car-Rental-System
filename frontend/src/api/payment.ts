import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/payment";

// Creating a new razorpay order
export const createRazorpayOrder = async (amount: number) => {
  const response = await axios.post(`${API_URL}/create-order`, { amount });
  return response.data;
};

// verifying payment
export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const response = await axios.post(`${API_URL}/verify-payment`, paymentData);
  return response.data;
};
