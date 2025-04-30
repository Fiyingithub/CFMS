import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      status: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // make sure you have JWT_SECRET in your .env
    req.admin = decoded; // Store user info in request for later use
    next(); // Allow request to move forward
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Invalid token",
    });
  }
};
