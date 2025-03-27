import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (UserId, res) => {
  const token = jwt.sign({ UserId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 60 * 60 * 24 * 100,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};
