import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const jwtSecretKey = process.env.JWT_SECRET;
  const { name, password } = req.body;
  if (password !== "") {
    return res.status(401).json({ message: "Invalid password" });
  }

  let data = {
    signInTime: Date.now(),
    name,
  };

  const token = jwt.sign(data, jwtSecretKey);
  res.status(200).json({ message: "success", token });
}
