import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getSession } from "../middleware/session.js";
dotenv.config();

async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.headers["x-refresh-token"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const { expired, payload } = verifyJWT(token);
    if (payload) {
      req.user = payload;
      return next();
    }
    const { payload: refresh } =
      expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };
    if (!refresh) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const session = await getSession(refresh.sessionId);
    if (!session) {
      return res.status(401).json({ message: "Session not found" });
    }
    const newToken = jwt.sign(
      { id: session.userId, email: session.email, role: session.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
    );
    /*const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;*/
    console.log(
      ` Nuevo token generado para el usuario ${session.userId} a las ${new Date().toLocaleString()}`,
    );
    res.setHeader("x-access-token", newToken);

    req.user = {
      id: session.userId,
      email: session.email,
      role: session.role,
    };
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

export { authenticate, permitirRoles };

function verifyJWT(token) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return { expired: false, payload };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const payload = jwt.decode(token);
      return { expired: true, payload };
    }
    return { expired: false, payload: null };
  }
}
