import express from 'express';
import BlogsController from '../../controllers/BlogsController';
import verfyJWT from '../../middleware/verifyJWT';
const router = express.Router();

router.route('/')
    .get(BlogsController.getAllBlogs)
    .post(verfyJWT, BlogsController.createNewBlog)
    .put(verfyJWT,  BlogsController.updateBlog)
    .delete(verfyJWT,  BlogsController.deleteBlog);

router.route('/:id')
    .get(BlogsController.getBlog);

module.exports = router; 