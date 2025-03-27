import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailregex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailregex.test(email)) {
      return res.status(400).json({ error: "invalid email format" });
    }
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ error: "username is already taken" });
    }

    const existingemail = await User.findOne({ email });
    if (existingemail) {
      return res.status(400).json({ error: "email is already taken" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        bio: newUser.bio,
        profileImg: newUser.profileImg,
      });
    } else {
      res.status(400).json({
        error: "Invalid User Data",
      });
    }
  } catch (error) {
    console.error("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordValid || !user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    });
  } catch (error) {
    console.error("Error in login controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
