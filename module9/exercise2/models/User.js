// this file defines the Mongoose schema and model for the User collection in MongoDB
// it specifies the structure of user documents, including fields, types, and constraints
// the schema includes username and email fields, both of which are required and unique
// the timestamps option automatically adds createdAt and updatedAt fields to the schema

const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,   // mirrors db.users.createIndex({ username:1 }, { unique:true })
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,   // mirrors db.users.createIndex({ email:1 }, { unique:true })
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,  // Mongoose auto-adds createdAt and updatedAt
  }
);
 
module.exports = mongoose.model('User', userSchema);
