// This file defines the Post model using Sequelize, which maps to the 'posts' table in the MySQL DB.

// The Post model represents a blog post created by a user.
// Each post is associated with a user via the user_id foreign key.

// The Post model has the following fields:
// - post_id: auto-incrementing integer, primary key
// - user_id: integer, foreign key referencing the users table, not null
// - title: string (max 150 chars), not null
// - description: text, not null
// - image_url: string (max 255 chars), optional
// - created_at: timestamp, automatically set by Sequelize
// - updated_at: timestamp, automatically set by Sequelize

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConnect');
 
const Post = sequelize.define(
  'Post',
  {
    post_id: {
      type:          DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:    true,
    },
    user_id: {
      type:      DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type:      DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type:      DataTypes.TEXT,
      allowNull: false,
    },
    image_url: {
      type:         DataTypes.STRING(255),
      allowNull:    true,    // optional — mirrors NULL in MySQL
      defaultValue: null,
    },
  },
  {
    tableName:  'posts',
    timestamps: true,
    createdAt:  'created_at',
    updatedAt:  'updated_at',
  }
);
 
module.exports = Post;
