import User from "../model/user.model.js";

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getMe controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { username, email, bio, currentPassword, newPassword } = req.body;
  const { profileImg } = req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    if (
      (!currentPassword && newPassword) ||
      (currentPassword && !newPassword)
    ) {
      return res
        .status(400)
        .json({ error: "Please provide current and new password" });
    }
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Password" });
      }
      if (currentPassword === newPassword) {
        return res
          .status(400)
          .json({ error: "New Password cannot be same as current password" });
      }
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be atleast 6 characters long" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPasword, salt);
    }

    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.profileImg = profileImg || user.profileImg;
    user.username = username || user.username;

    user = await user.save();
    user.password = null;
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUser", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
