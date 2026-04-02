// This file defines the routes for post-related operations, including CRUD actions, comments, and likes. 
// Each route is linked to a corresponding controller function that handles the business logic for that operation. 
// The routes are organized under the /api/posts endpoint, allowing for easy integration with the main application.

// The full list of routes includes:
// - GET    /api/posts                -> getAllPosts
// - GET    /api/posts/user/:userId   -> getPostsByUser
// - GET    /api/posts/:id            -> getPostById
// - POST   /api/posts                -> createPost
// - PUT    /api/posts/:id            -> updatePost
// - DELETE /api/posts/:id            -> deletePost
// - POST   /api/posts/:id/comments   -> addComment
// - POST   /api/posts/:id/likes      -> likePost
// - DELETE /api/posts/:id/likes      -> unlikePost

const express = require('express');
const router  = express.Router();
const {
  getAllPosts, getPostsByUser, getPostById,
  createPost, updatePost, deletePost,
  addComment, likePost, unlikePost,
} = require('../controllers/postController');
 
// Post CRUD
router.get('/',                getAllPosts);      // GET    /api/posts
router.get('/user/:userId',    getPostsByUser);   // GET    /api/posts/user/:userId
router.get('/:id',             getPostById);      // GET    /api/posts/:id
router.post('/',               createPost);       // POST   /api/posts
router.put('/:id',             updatePost);       // PUT    /api/posts/:id
router.delete('/:id',          deletePost);       // DELETE /api/posts/:id
 
// Comments
router.post('/:id/comments',   addComment);       // POST   /api/posts/:id/comments
 
// Likes
router.post('/:id/likes',      likePost);         // POST   /api/posts/:id/likes
router.delete('/:id/likes',    unlikePost);       // DELETE /api/posts/:id/likes
 
module.exports = router;
