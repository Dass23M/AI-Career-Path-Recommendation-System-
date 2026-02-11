const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ======================================
// Protect Middleware (JWT Authentication)
// ======================================
const protect = async (req, res, next) => {
  let token;

  try {

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      // Extract Token
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (without password)
      req.user = await User.findById(decoded.id).select("-password");

      next();

    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
      error: error.message,
    });
  }
};


// ======================================
// Role-Based Authorization (Future Ready)
// ======================================
const authorize = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};


module.exports = {
  protect,
  authorize,
};
