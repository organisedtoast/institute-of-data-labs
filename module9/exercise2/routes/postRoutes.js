// This file defines the routes for post-related operations.
// It imports the necessary controller functions and sets up the routes for creating a post, 
// retrieving all posts, retrieving a post by ID, updating a post, deleting a post, 
// adding a comment, deleting a comment, liking a post, and unliking a post.

// Finally, it exports the router to be used in the main application file.

const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
  likePost,
  unlikePost,
} = require('../controllers/postController');
 
// Post CRUD
router.get('/',         getAllPosts);    // GET    /api/posts
router.get('/:id',      getPostById);   // GET    /api/posts/:id
router.post('/',        createPost);    // POST   /api/posts
router.put('/:id',      updatePost);    // PUT    /api/posts/:id
router.delete('/:id',   deletePost);    // DELETE /api/posts/:id
 
// Comments
router.post('/:id/comments',                   addComment);     // POST   /api/posts/:id/comments
router.delete('/:id/comments/:commentId',       deleteComment);  // DELETE /api/posts/:id/comments/:commentId
 
// Likes
router.post('/:id/likes',   likePost);    // POST   /api/posts/:id/likes
router.delete('/:id/likes', unlikePost);  // DELETE /api/posts/:id/likes
 
module.exports = router;
