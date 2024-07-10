import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    googleId: { type: String, unique: true,  sparse: true  },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: function() {
        return !this.googleId;
      },
      trim: true,
    },
  },
  { timestamps: true }
);

// user password encrypting process
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = model("User", userSchema);
