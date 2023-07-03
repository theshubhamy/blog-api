import express from 'express';
import {isAuth} from '../middleware/isAuth.js';
import {createBlog,getAllBlogs,getBlogById,updateBlog,deleteBlog} from '../controllers/blogController.js';

const router = express.Router();

router.post('/blogs', isAuth, createBlog);
router.get('/blogs/:blogId', getBlogById);
router.put('/blogs/:blogId', isAuth, updateBlog);
router.delete('/blogs/:blogId', isAuth, deleteBlog);
router.get('/blogs', getAllBlogs);
export default router;

