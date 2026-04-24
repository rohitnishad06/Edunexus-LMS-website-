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


    if (!verifyToken) {
      return res.status(403).json({ message: "User token is invalid" });
    }

    req.userId = verifyToken.userId;

    next();

  } catch (error) {
    return res.status(500).json({ message: `isAuth error: ${error.message}` });
  }
};

export default isAuth;
