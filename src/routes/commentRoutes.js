import express from 'express';
import {isAuth} from '../middleware/isAuth.js';
import {addComment,getCommentsByBlogId} from '../controllers/commentController.js';

const router = express.Router();

router.post('/blogs/:blogId/comments', isAuth, addComment);
router.get('/blogs/:blogId/comments', getCommentsByBlogId);

export default router;
