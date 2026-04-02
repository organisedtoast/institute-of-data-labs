// This file sets up the Sequelize connection to MySQL and exports both the connection instance
// and a function to test the connection.

const { Sequelize } = require('sequelize');
 
const sequelize = new Sequelize(
  process.env.DB_NAME,   // 'blog_app'
  process.env.DB_USER,   // 'root'
  process.env.DB_PASS,   // your password
  {
    host:    process.env.DB_HOST,   // 'localhost'
    port:    process.env.DB_PORT,   // 3306
    dialect: 'mysql',               // Sequelize dialect name for MySQL
                                     // The mysql2 package is still required as the Node driver underneath.
    logging: false,                 // set to console.log to see raw SQL in terminal
  }
);
 
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected successfully.');
  } catch (error) {
    console.error('MySQL connection error:', error.message);
    process.exit(1);  // crash immediately — there is no point running without a DB
  }
};
 
module.exports = { sequelize, connectDB };
