import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

     // Check if header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Token not found" });
    }

     // Extract token
    const token = authHeader.split(" ")[1];

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);


    req.userId = verifyToken.userId;

    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired" });
  }

  return res.status(401).json({ message: "Invalid token" });
  }
};

export default isAuth;
