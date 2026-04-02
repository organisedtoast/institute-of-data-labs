// This file defines the Comment model using Sequelize, which represents the comments made by users
// on posts in the blogging platform. 

// Each comment is associated with a specific post and user, and contains the text of the comment
// along with timestamps for when it was created.

// The model includes the following fields:
// - comment_id: A unique identifier for each comment (primary key, auto-incremented).
// - post_id: The ID of the post that the comment is associated with (foreign key).
// - user_id: The ID of the user who made the comment (foreign key).
// - comment_text: The text content of the comment.
// - created_at: A timestamp for when the comment was created (automatically managed by Sequelize).

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConnect');
 
const Comment = sequelize.define(
  'Comment',
  {
    comment_id: {
      type:          DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:    true,
    },
    post_id: {
      type:      DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type:      DataTypes.INTEGER,
      allowNull: false,
    },
    comment_text: {
      type:      DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName:  'comments',
    timestamps: true,
    createdAt:  'created_at',
    updatedAt:  false,
  }
);
 
module.exports = Comment;
