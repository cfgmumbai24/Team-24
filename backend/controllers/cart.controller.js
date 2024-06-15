const { Cart, validateCart } = require("../models/cart.model");
const HTTPError = require("../utils/HTTPError");
const HTTPResponse = require("../utils/HTTPResponse");
const mongoose = require("mongoose");

// Update or create a cart
exports.updateCart = async (req, res) => {
  try {
    const data = req.body;

    // Validate the incoming data using Zod
    const validationResult = validateCart(data);
    if (!validationResult.success) {
      return HTTPError(
        res,
        400,
        "Field validation failed!",
        validationResult.error.flatten().fieldErrors
      );
    }

    // Check if a cart for this user already exists
    let existingCart = await Cart.findOne({ user: req.user._id });
    if (existingCart) {
      // Update the cart items
      existingCart.items = data.items;
      await existingCart.save();

      // Respond with a success message
      return HTTPResponse(
        res,
        true,
        200,
        "Cart updated successfully!",
        null,
        { cart: existingCart }
      );
    } else {
      // Create a new cart using the validated data
      const newCart = await Cart.create({
        user: req.user._id,
        items: data.items,
      });

      // Respond with a success message
      return HTTPResponse(
        res,
        true,
        201,
        "Cart created successfully!",
        null,
        { cart: newCart }
      );
    }
  } catch (error) {
    console.error("Error updating or creating cart:", error);
    return HTTPError(res, 500, "Internal server error", error.message);
  }
};

// Delete a cart
exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return HTTPError(
        res,
        400,
        "Invalid cart ID",
        { id: "Cart ID is not a valid ObjectId" }
      );
    }

    // Find and delete the cart by ID
    const deletedCart = await Cart.findByIdAndDelete(id);

    if (!deletedCart) {
      return HTTPError(res, 404, "Cart not found", "No cart with the given ID exists.");
    }

    // Respond with a success message
    return HTTPResponse(
      res,
      true,
      200,
      "Cart deleted successfully!",
      null,
      { cart: deletedCart }
    );
  } catch (error) {
    console.error("Error deleting cart:", error);
    return HTTPError(res, 500, "Internal server error", error.message);
  }
};

// Get a cart for the authenticated user
exports.getCartByUser = async (req, res) => {
  try {
    // Retrieve the cart by user ID
    const cart = await Cart.findOne({ user: req.user._id }).populate('user items.productId');

    if (!cart) {
      return HTTPError(res, 404, "Cart not found", "No cart for the authenticated user exists.");
    }

    // Respond with the cart
    return HTTPResponse(
      res,
      true,
      200,
      "Cart retrieved successfully!",
      null,
      { cart }
    );
  } catch (error) {
    console.error("Error retrieving cart:", error);
    return HTTPError(res, 500, "Internal server error", error.message);
  }
};


// Remove an item from the cart
exports.removeItemFromCart = async (req, res) => {
    try {
      const { productId } = req.params;
  
      // Validate that the productId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return HTTPError(
          res,
          400,
          "Invalid product ID",
          { productId: "Product ID is not a valid ObjectId" }
        );
      }
  
      // Find the user's cart
      const cart = await Cart.findOne({ user: req.user._id });
  
      if (!cart) {
        return HTTPError(res, 404, "Cart not found", "No cart for the authenticated user exists.");
      }
  
      // Remove the item from the cart
      cart.items = cart.items.filter(item => !item.productId.equals(productId));
  
      // Save the updated cart
      await cart.save();
  
      // Respond with a success message
      return HTTPResponse(
        res,
        true,
        200,
        "Item removed successfully!",
        null,
        { cart }
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
      return HTTPError(res, 500, "Internal server error", error.message);
    }
  };