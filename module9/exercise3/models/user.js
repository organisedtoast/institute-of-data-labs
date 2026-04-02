// This file defines the User model using Sequelize, mapping to the 'users' table in MySQL.

// The User model has the following fields:
// - user_id: auto-incrementing integer, primary key
// - username: string (max 50 chars), not null
// - email: string (max 100 chars), not null, unique
// - created_at: timestamp, automatically set by Sequelize

// The model is configured to use the 'users' table and to automatically manage the created_at timestamp.
// NB: The updated_at timestamp is disabled since the users table does not have an updated_at column.

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConnect');
 
const User = sequelize.define(
  'User',          // model name — Sequelize will look for table 'Users' (pluralised)
  {
    user_id: {
      type:          DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:    true,
    },
    username: {
      type:      DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type:      DataTypes.STRING(100),
      allowNull: false,
      unique:    true,   // mirrors UNIQUE constraint in MySQL
    },
  },
  {
    tableName:  'users',       // exact table name in MySQL
    timestamps: true,          // Sequelize adds createdAt and updatedAt
    createdAt:  'created_at',  // map to your MySQL column names
    updatedAt:  false,         // users table has no updated_at
  }
);
 
module.exports = User;
