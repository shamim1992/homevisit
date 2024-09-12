import nodemailer from 'nodemailer';

 const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.user.email,
    // cc: process.env.CC_EMAIL,
    subject: 'Order Confirmation',
    text: `Dear ${patientname},
Thank you for booking an appointment.
Here are your order details:
- Services: ${services.join(', ')}
- Physiotherapist: ${physiotherapist ? physiotherapist.name : 'Not Assigned Yet'}
- Address: ${address}
- Mobile: ${mobile}
- Preferred Date: ${new Date(preferredDate).toLocaleDateString()}
- Pin Code: ${pin}

We will notify you once your order is processed.

Best regards,
Your Company`,
};

export default mailOptions



