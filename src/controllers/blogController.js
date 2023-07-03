import  {Blog}  from '../models/config.js';

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { userId } = req;

    const blog = await Blog.create({ title, content, UserId: userId });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a blog post' });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the blog post' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, content } = req.body;
    const { userId } = req;

    const blog = await Blog.findOne({ where: { id: blogId, UserId: userId } });

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    await blog.update({ title, content });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the blog post' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { userId } = req;

    const blog = await Blog.findOne({ where: { id: blogId, UserId: userId } });

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    await blog.destroy();

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the blog post' });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blog posts' });
  }
};

