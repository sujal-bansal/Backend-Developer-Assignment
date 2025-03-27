import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImg: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
