const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//user schema
const userSchema = new Schema(
  {
    // UserID
    // First name
    // Last name
    // Email
    // Role

    FirstName: {
      type: String,
      required: true,
    },

    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Description :{
      type : String,

    },
    Password: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      default: "user",
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
