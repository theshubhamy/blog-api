import   {Comment, Blog}  from '../models/config.js';

export const addComment = async (req, res,next) => {
  try {
    const { content } = req.body;
    const { blogId } = req.params;
    const { userId } = req;

    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      const error = new Error("Blog post not found");
      error.statusCode = 404;
      return next(error);
    }

    const comment = await Comment.create({ content, BlogId: blogId, UserId: userId });

    res.status(201).json(comment);
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getCommentsByBlogId = async (req, res,next) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      const error = new Error("Blog post not found");
      error.statusCode = 404;
      return next(error);
    }

    const comments = await Comment.findAll({ where: { BlogId: blogId } });

    res.status(200).json(comments);
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

