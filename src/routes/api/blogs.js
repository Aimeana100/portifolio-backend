import express from 'express';
import BlogsController from '../../controllers/BlogsController';

const router = express.Router();

router.route('/')
    .get(BlogsController.getAllBlogs)
    .post( BlogsController.createNewBlog)
    .put( BlogsController.updateBlog)
    .delete( BlogsController.deleteBlog);

router.route('/:id')
    .get(BlogsController.getBlog);

module.exports = router;