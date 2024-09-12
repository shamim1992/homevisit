import React, { useState } from 'react';
import { updatePaymentStatus } from '../../api/order';

const Checkout = ({ orderId }) => {
    const [paymentMethod, setPaymentMethod] = useState('cash'); // Example method
    const [paymentDetails, setPaymentDetails] = useState({});  // Add details here as needed

    const handlePayment = async () => {
        // Assume payment is processed and successful

        await updatePaymentStatus(orderId, 'paid', paymentMethod, paymentDetails);
        alert('Payment successful and status updated!');
    };

    return (
        <div>
            <h2>Checkout</h2>
            <p>Select Payment Method:</p>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
            </select>
            <button onClick={handlePayment}>Make Payment</button>
        </div>
    );
};

export default Checkout;
