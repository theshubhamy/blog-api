import { Blog } from "../models/config.js";

export const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { userId } = req;

    const isExistingBlog = await Blog.findOne({ where: { title } });
    if (!isExistingBlog) {
      const blog = await Blog.create({ title, content, UserId: userId });
      res.status(201).json(blog);
    } else {
      const error = new Error("Blog with the title already exist!");
      error.statusCode = 404;
      return next(error);
    }
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      const error = new Error("Blog post not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(blog);
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { title, content } = req.body;
    const { userId } = req;

    const blog = await Blog.findOne({ where: { id: blogId, UserId: userId } });

    if (!blog) {
      const error = new Error("Blog post not found");
      error.statusCode = 404;
      return next(error);
    }

    await blog.update({ title, content });

    res.status(201).json(blog);
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { userId } = req;

    const blog = await Blog.findOne({ where: { id: blogId, UserId: userId } });

    if (!blog) {
      const error = new Error("Blog post not found");
      error.statusCode = 404;
      return next(error);
    }

    await blog.destroy();

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    if (!blogs) {
      const error = new Error("Blog post not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json(blogs);
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
