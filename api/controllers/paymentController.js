// controllers/paymentController.js
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/orderModel.js';

export const initiatePayment = async (req, res) => {
  const { totalAmount, orderId } = req.body;

  try {
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // Razorpay API Key
      key_secret: process.env.RAZORPAY_SECRET, // Razorpay Secret Key
    });

    // Create a new Razorpay order
    const options = {
      amount: totalAmount * 100, // Razorpay expects the amount in smallest currency unit (paise)
      currency: 'INR',
      receipt: `receipt_${orderId}`, // Can pass the order ID here
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment initiation failed',
    });
  }
};

export const verifyPayment = async (req, res) => {
  const { order_id, payment_id, razorpay_signature } = req.body;

  const key_secret = process.env.RAZORPAY_SECRET;

  // Generate HMAC to verify Razorpay signature
  const body = order_id + '|' + payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', key_secret)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    try {
      // Payment verified successfully, now update the order status
      await Order.findByIdAndUpdate(order_id, {
        paymentStatus: 'paid',
        paymentDetails: { paymentId: payment_id },
      });

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
      });
    } catch (error) {
      console.error('Error updating order after payment verification:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating order after payment verification',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
};
