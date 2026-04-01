// This is the most important file in the backend, as it defines the data model for our application

// It defines the Mongoose schema and model for the Post collection in MongoDB
// The schema specifies the structure of post documents, including fields, types, and constraints
// It also defines two sub-schemas for comments and likes,
// which are embedded as arrays in the main post schema

// The authorId field references the User model, allowing us to populate author details when querying posts
// The comments and likes fields are arrays of sub-documents, each containing a userId reference to the User model
// The timestamps option automatically adds createdAt and updatedAt fields to the post documents, as well as to each comment and like sub-document


const mongoose = require('mongoose');
 
// ── sub-schemas (embedded arrays) ──────────────────────────
const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',       // tells Mongoose which model to populate from
      required: true,
    },
    commentText: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }   // adds createdAt/updatedAt to each comment
);
 
const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);
 
// ── main post schema ────────────────────────────────────────
const postSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',       // reference to the users collection
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: null,     // optional — null when no image
    },
    comments: [commentSchema],   // embedded array of comment sub-docs
    likes:    [likeSchema],      // embedded array of like sub-docs
  },
  {
    timestamps: true,
  }
);
 
module.exports = mongoose.model('Post', postSchema);
