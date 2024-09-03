const express = require('express');
const multer = require('multer');
const router = express.Router();
const cors = require('cors');

// Brevo API setup
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];






apiKey.apiKey = '';






const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Image upload setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/apps/upload-form', upload.single('image'), async (req, res) => {
    const companyName = req.body.companyName 
    const companyEmail = req.body.companyEmail 
    const companyPhone = req.body.companyPhone 
    const businessType = req.body.businessType
    const FEIN = req.body.FEIN
    const yearEstablished = req.body.yearEstablished 
    const companyWebsite = req.body.companyWebsite 
    const socialMedia = req.body.socialMedia 
    const billingStreetAddress = req.body.billingStreetAddress 
    const billingCity = req.body.billingCity 
    const billingState = req.body.billingState 
    const billingZipCode = req.body.billingZipCode 
    const billingCountry = req.body.billingCountry 
    const businessLocation = req.body.businessLocation
    const shippingAddress = req.body.shippingAddress 
    const shippingCity = req.body.shippingCity 
    const shippingState = req.body.shippingState 
    const shippingZipCode = req.body.shippingZipCode 
    const shippingCountry = req.body.shippingCountry 
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const phone = req.body.phone
    const hereAbout = req.body.hereAbout
    const recipientEmail = req.body.recipientEmail;
    const corsDomain = req.body.corsDomain;
    const senderEmail = req.body.senderEmail

    console.log('Recipient Email:', recipientEmail);

    const allowedOrigin = corsDomain ? corsDomain : 'https://www.wheeloutletnj.com/';
    
    res.header("Access-Control-Allow-Origin", allowedOrigin);
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

sendSmtpEmail.subject = `Wholesale inquiry from ${firstName} ${lastName}`;
sendSmtpEmail.sender = {
    "name": "Wheeloutlet NJ",
    "email": senderEmail
};
sendSmtpEmail.to = [{
    "email": recipientEmail
}];

// Convert image to base64
let encodedImage = req.file.buffer.toString('base64');



sendSmtpEmail.htmlContent = `
    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Last Name:</strong> ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>How did you hear about us?:</strong> ${hereAbout}</p>
    <hr>
    <p><strong>Company Name:</strong> ${companyName}</p>
    <p><strong>Company Email:</strong> ${companyEmail}</p>
    <p><strong>Company Phone:</strong> ${companyPhone}</p>
    <p><strong>Business Type:</strong> ${businessType}</p>
    <p><strong>FEIN:</strong> ${FEIN}</p>
    <p><strong>Year Established:</strong> ${yearEstablished}</p>
    <p><strong>Company Website:</strong> ${companyWebsite}</p>
    <p><strong>Social Media:</strong> ${socialMedia}</p>
    <br>
    <p><strong>Billing Address:</strong> ${billingStreetAddress}, ${billingCity}, ${billingState}, ${billingZipCode}, ${billingCountry}</p>
    <p><strong>Is the business operating at the owner's residence?:</strong> ${businessLocation}</p>
    <p><strong>Shipping Address:</strong> ${shippingAddress}, ${shippingCity}, ${shippingState}, ${shippingZipCode}, ${shippingCountry}</p>
    <br>
`;

sendSmtpEmail.attachment = [{
    "content": encodedImage,
    "name": "uploaded_image.jpeg",
    "type": "image/jpeg"
}];
  


    apiInstance.sendTransacEmail(sendSmtpEmail).then(data => {
        console.log('API called successfully. Returned data: ', data);
        res.json({ success: true, message: 'Form submitted successfully!' });  // JSON response
    }).catch(error => {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error while sending email.' });  // JSON response
    });
});




module.exports = router;







