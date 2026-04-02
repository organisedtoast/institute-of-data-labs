// This file defines the controller functions for handling post-related API requests.
// All CRUD operations for posts are implemented here.

// It uses Sequelize models to query the database and return the appropriate data in JSON format. 
// The most important function here is `getAllPosts`, which retrieves all posts 
// along with their authors, comments, and likers.

// The other functions are more straightforward CRUD operations for posts, as well as adding comments and likes.
// Note that error handling is included to return appropriate HTTP status codes and messages for different scenarios.


const { Post, User, Comment, Like } = require('../models/index');
 
// GET /api/posts  — all posts, each including author + comments + likers
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as:    'author',           // alias defined in models/index.js
          attributes: ['user_id', 'username', 'email'],  // only these columns from users
        },
        {
          model: Comment,
          as:    'comments',
          include: [
            {
              model:      User,
              as:         'commenter',  // who wrote each comment
              attributes: ['user_id', 'username'],
            }
          ],
        },
        {
          model:      User,
          as:         'likers',         // many-to-many via likes junction table
          attributes: ['user_id', 'username'],
          through:    { attributes: [] }, // hide the junction table columns in the result
        },
      ],
      order: [['created_at', 'DESC']],  // newest posts first
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/posts/user/:userId  — all posts by one user, with their profile included
const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.params.userId },  // filter to one user
      include: [
        {
          model:      User,
          as:         'author',
          attributes: ['user_id', 'username', 'email'],  // user fields appear alongside post fields
        },
        {
          model: Comment,
          as:    'comments',
          include: [{ model: User, as: 'commenter', attributes: ['username'] }],
        },
        {
          model:      User,
          as:         'likers',
          attributes: ['user_id', 'username'],
          through:    { attributes: [] },
        },
      ],
      order: [['created_at', 'DESC']],
    });
    if (!posts.length) {
      return res.status(404).json({ message: 'No posts found for this user.' });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET /api/posts/:id  — one post by its id, with author + comments + likers
const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User,    as: 'author',   attributes: ['user_id','username','email'] },
        { model: Comment, as: 'comments', include:[{ model:User, as:'commenter', attributes:['username'] }] },
        { model: User,    as: 'likers',   attributes:['user_id','username'], through:{ attributes:[] } },
      ],
    });
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/posts  — create a new post
const createPost = async (req, res) => {
  try {
    const { user_id, title, description, image_url } = req.body;
    const post = await Post.create({ user_id, title, description, image_url: image_url || null });
    res.status(201).json(post);
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ message: 'user_id does not exist in the users table.' });
    }
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/posts/:id  — update a post's title, description, or image
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    const { title, description, image_url } = req.body;
    await post.update({ title, description, image_url });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/posts/:id  — delete a post (and its comments and likes via cascade)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    await post.destroy();   // Sequelize cascades to comments and likes if set
    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/posts/:id/comments  — add a comment to a post
const addComment = async (req, res) => {
  try {
    const { user_id, comment_text } = req.body;
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    const comment = await Comment.create({ post_id: req.params.id, user_id, comment_text });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/posts/:id/like  — like a post (creates a record in the likes table)
const likePost = async (req, res) => {
  try {
    const { user_id } = req.body;
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
 
    const [like, created] = await Like.findOrCreate({
      where: { user_id, post_id: req.params.id },
      defaults: { user_id, post_id: req.params.id },
    });
    if (!created) {
      return res.status(400).json({ message: 'You have already liked this post.' });
    }
    res.status(201).json({ message: 'Post liked.', like });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/posts/:id/unlike  — unlike a post (deletes the record in the likes table)
const unlikePost = async (req, res) => {
  try {
    const { user_id } = req.body;
    const deleted = await Like.destroy({
      where: { user_id, post_id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ message: 'Like not found.' });
    res.status(200).json({ message: 'Like removed.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Export all controller functions to be used in the routes
module.exports = {
  getAllPosts, getPostsByUser, getPostById,
  createPost, updatePost, deletePost,
  addComment, likePost, unlikePost,
};


