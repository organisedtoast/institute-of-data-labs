// This is arguably the most important file in the models directory,
// as it defines the relationships between all the models in our blogging platform.

// The file imports the User, Post, Comment, and Like models, and then sets up the associations between them
// using Sequelize's association methods.

// The relationships defined in this file are as follows:
// 1. One-to-Many: A user can have many posts (User hasMany Post, Post belongsTo User).
// 2. One-to-Many: A post can have many comments (Post hasMany Comment, Comment belongsTo Post).
// 3. One-to-Many: A user can write many comments (User hasMany Comment, Comment belongsTo User).
// 4. Many-to-Many: Many users can like many posts (User belongsToMany Post through Like, Post belongsToMany User through Like).

// By defining these relationships in this central file, we can easily manage and query the associations
// between our models throughout the application.

const User    = require('./user');
const Post    = require('./post');
const Comment = require('./comment');
const Like    = require('./like');
 
// ── ONE-TO-MANY: one user can have many posts ──────────────────────
User.hasMany(Post,    { foreignKey: 'user_id', as: 'posts' });
Post.belongsTo(User,  { foreignKey: 'user_id', as: 'author' });
 
// ── ONE-TO-MANY: one post can have many comments ───────────────────
Post.hasMany(Comment,     { foreignKey: 'post_id', as: 'comments' });
Comment.belongsTo(Post,   { foreignKey: 'post_id', as: 'post' });
 
// ── ONE-TO-MANY: one user can write many comments ──────────────────
User.hasMany(Comment,    { foreignKey: 'user_id', as: 'userComments' });
Comment.belongsTo(User,  { foreignKey: 'user_id', as: 'commenter' });
 
// ── MANY-TO-MANY: many users can like many posts ───────────────────
User.belongsToMany(Post, { through: Like, foreignKey: 'user_id', as: 'likedPosts' });
Post.belongsToMany(User, { through: Like, foreignKey: 'post_id', as: 'likers' });
 
module.exports = { User, Post, Comment, Like };
