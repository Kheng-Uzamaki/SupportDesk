import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Not Authorized, token missing!");
    }

    try {
      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded:", decoded); // Debug log for decoded token

      // Get user from token without password field
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found, not authorized!");
      }

      console.log("Authenticated user:", req.user); // Debug log for user
      next();
    } catch (error) {
      console.log("JWT Verification Error:", error); // Log error details
      res.status(401);
      throw new Error("Not Authorized, token invalid!");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token provided!");
  }
});

export { protect };

