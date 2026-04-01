// This file defines the controller functions for handling HTTP requests related to posts 
// in the social media app

// It imports the Post model to interact with the posts collection in MongoDB
// The controller includes functions for getting all posts, getting a post by id, creating a new post,
// updating a post, deleting a post, adding a comment, deleting a comment, liking a post, and unliking a post




const Post = require('../models/Post');
 
// GET /api/posts  — get all posts, populated with author and commenter data
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('authorId', 'username email')       // replace authorId ObjectId
                                                    // with {username, email} from users
      .populate('comments.userId', 'username')      // replace each comment's userId
                                                    // with {username} from users
      .populate('likes.userId', 'username')         // same for likes
      .sort({ createdAt: -1 });                     // newest first
 
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/posts/:id  — get one post, fully populated
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('authorId', 'username email')
      .populate('comments.userId', 'username')
      .populate('likes.userId', 'username');
 
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/posts  — create a new post
const createPost = async (req, res) => {
  try {
    const { authorId, title, description, imageUrl } = req.body;
    const post = await Post.create({
      authorId,
      title,
      description,
      imageUrl: imageUrl || null,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/posts/:id  — update title, description, or imageUrl
const updatePost = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl },
      { new: true, runValidators: true }  // new: true returns the updated doc
    );
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/posts/:id  — delete a post entirely
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    res.status(200).json({ message: 'Post deleted.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/posts/:id/comments  — add a comment to a post
const addComment = async (req, res) => {
  try {
    const { userId, commentText } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
 
    post.comments.push({ userId, commentText });  // push to embedded array
    await post.save();
 
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/posts/:id/comments/:commentId  — remove one comment
const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
 
    // pull the comment with matching _id out of the embedded array
    post.comments = post.comments.filter(
      c => c._id.toString() !== req.params.commentId
    );
    await post.save();
 
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/posts/:id/likes  — like a post (no duplicates)
const likePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
 
    // guard: check if userId already exists in the likes array
    const alreadyLiked = post.likes.some(
      l => l.userId.toString() === userId
    );
    if (alreadyLiked) {
      return res.status(400).json({ message: 'You have already liked this post.' });
    }
 
    post.likes.push({ userId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/posts/:id/likes  — remove a like
const unlikePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
 
    post.likes = post.likes.filter(
      l => l.userId.toString() !== userId
    );
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
    createPost,
    updatePost,
    deletePost,
    addComment,
    deleteComment,
    likePost,
    unlikePost,
};  


