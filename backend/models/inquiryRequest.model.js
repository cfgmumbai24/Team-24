// controllers/inquiry.controller.js
const { InquiryRequest, validateInquiryRequest } = require("../models/inquiryRequest.model");
const HTTPError = require("../utils/HTTPError");
const HTTPResponse = require("../utils/HTTPResponse");
const Resend = require('@resend/node');
const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.storeAndSendInquiry = async (req, res) => {
  try {
    const data = req.body;

    // Validate the incoming data using Zod
    const validationResult = validateInquiryRequest(data);
    if (!validationResult.success) {
      return HTTPError(
        res,
        400,
        "Field validation failed!",
        validationResult.error.flatten().fieldErrors
      );
    }

    // Create the inquiry in the database
    const inquiryRequest = await InquiryRequest.create({
      userId: req.user._id,
      productIds: data.productIds,
      poc: data.poc,
    });

    // Populate user and product details for the email
    const user = await User.findById(req.user._id).lean();
    if (!user) {
      return HTTPError(res, 404, "User not found", "No user with the given ID exists.");
    }

    const products = [];
    for (const item of data.productIds) {
      const product = await Product.findById(item.productId).lean();
      if (!product) {
        return HTTPError(res, 404, "Product not found", `No product with the given ID: ${item.productId} exists.`);
      }
      products.push({ name: product.name, quantity: item.qty, price: product.price });
    }

    const emailContent = `
      <h1>Inquiry Request Details</h1>
      <p><strong>User:</strong> ${user.name} (${user.email})</p>
      <p><strong>Contact:</strong> ${user.contact}</p>
      <p><strong>Address:</strong> ${user.address || "N/A"}</p>
      <h2>Products</h2>
      <ul>
        ${products.map(product => `
          <li>
            <strong>${product.name}</strong><br>
            Quantity: ${product.quantity}<br>
            Price: $${product.price.toFixed(2)}
          </li>
        `).join('')}
      </ul>
    `;

    // Send the email using Resend
    await resend.sendEmail({
      from: 'noreply@example.com', // Change to your sending email
      to: data.recipientEmail,
      subject: 'Inquiry Request Details',
      html: emailContent,
    });

    // Respond with a success message
    return HTTPResponse(
      res,
      true,
      201,
      "Inquiry created and email sent successfully!",
      null,
      { inquiryRequest }
    );
  } catch (error) {
    console.error("Error processing inquiry request:", error);
    return HTTPError(res, 500, "Internal server error", error.message);
  }
};
