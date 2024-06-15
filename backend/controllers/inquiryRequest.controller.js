const { InquiryRequest } = require("../models/inquiryRequest.model");
const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");
const HTTPError = require("../utils/HTTPError");
const HTTPResponse = require("../utils/HTTPResponse");
const Resend = require('@resend/node');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendInquiryEmail = async (req, res) => {
  try {
    const { id, recipientEmail } = req.params;

    // Validate that the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return HTTPError(
        res,
        400,
        "Invalid inquiry request ID",
        { id: "Inquiry request ID is not a valid ObjectId" }
      );
    }

    // Find the inquiry request by ID
    const inquiryRequest = await InquiryRequest.findById(id)
      .populate('userId', 'name email contact address') // Populate user details
      .populate('productIds.productId', 'name price'); // Populate product details

    if (!inquiryRequest) {
      return HTTPError(res, 404, "Inquiry request not found", "No inquiry request with the given ID exists.");
    }

    // Format the email content
    const user = inquiryRequest.userId;
    const products = inquiryRequest.productIds.map(item => ({
      name: item.productId.name,
      quantity: item.qty,
      price: item.productId.price,
    }));

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
            Quantity: ${product.quantity}<br>}
          </li>
        `).join('')}
      </ul>
    `;

    // Send the email using Resend
    await resend.sendEmail({
      from: 'noreply@example.com', // Change to your sending email
      to: recipientEmail,
      subject: 'Inquiry Request Details',
      html: emailContent,
    });

    // Respond with a success message
    return HTTPResponse(
      res,
      true,
      200,
      "Inquiry details emailed successfully!",
      null,
      { inquiryRequest }
    );
  } catch (error) {
    console.error("Error sending inquiry email:", error);
    return HTTPError(res, 500, "Internal server error", error.message);
  }
};
