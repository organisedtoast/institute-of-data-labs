// This model represents the "Like" entity, which captures the relationship between 
// users and posts they have liked. 


// Each like is uniquely identified by a composite primary key consisting of user_id and post_id,
// ensuring that a user can only like a specific post once. 
// The model also includes timestamps to track when each like was created.

// The model includes the following fields:
// - user_id: The ID of the user who liked the post (foreign key, part of composite primary key).
// - post_id: The ID of the post that was liked (foreign key, part of composite primary key).
// - created_at: A timestamp for when the like was created (automatically managed by Sequelize).

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConnect');
 
const Like = sequelize.define(
  'Like',
  {
    user_id: {
      type:       DataTypes.INTEGER,
      allowNull:  false,
      primaryKey: true,   // part of composite PK
    },
    post_id: {
      type:       DataTypes.INTEGER,
      allowNull:  false,
      primaryKey: true,   // part of composite PK — together (user_id, post_id) is unique
    },
  },
  {
    tableName:  'likes',
    timestamps: true,
    createdAt:  'created_at',
    updatedAt:  false,
  }
);
 
module.exports = Like;
