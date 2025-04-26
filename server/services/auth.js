import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token", err });
  }
}

function permitirRoles(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!rolesPermitidos.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient rights" });
    }
    next();
  };
}

export { verificarToken, permitirRoles };
