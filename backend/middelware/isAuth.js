import jwt from "jsonwebtoken";

/**
 * ============================
 * isAuth Middleware
 * Description:
 *              Middleware to verify JWT token from cookies
 *              and authenticate the user before accessing protected routes.
 */

const isAuth = async (req, res, next) => {
  try {

    // Extract token from cookies
    const { token } = req.cookies;

    // If no token is found, deny access
    if (!token) {
      return res.status(401).json({ message: "User does not have a token" });
    }

    // Verify token using JWT secret
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    // If verification fails, deny access
    if (!verifyToken) {
      return res.status(403).json({ message: "User token is invalid" });
    }

    // Attach user ID to request object for further use (e.g., in controllers)
    req.userId = verifyToken.userId;

    // Move to next middleware or route handler
    next();

  } catch (error) {
    return res.status(500).json({ message: `isAuth error: ${error.message}` });
  }
};

export default isAuth;
