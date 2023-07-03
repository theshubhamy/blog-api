// src/controllers/commentController.js
import   {Comment, Blog}  from '../models/config.js';

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { blogId } = req.params;
    const { userId } = req;

    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const comment = await Comment.create({ content, BlogId: blogId, UserId: userId });

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add a comment' });
  }
};

export const getCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const comments = await Comment.findAll({ where: { BlogId: blogId } });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
};

