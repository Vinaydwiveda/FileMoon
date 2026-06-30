const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },

    Email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },

    Mobile: {
      type: String,
      trim: true,
      required: true,
    },

    Password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  
    const count = await User.countDocuments({
      Email: this.Email,
    });

    if (count > 0) {
      throw  new Error("User already registered")
    }

  
  
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();

  const Password = this.Password;

  if (!Password) throw new Error("Please fill the credentials");

  this.Password = await bcrypt.hash(Password, 12);
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;