import express from 'express';
import CommentController from '../../controllers/CommentsController';

const router = express.Router();

router.route('/')
  .put(CommentController.updateComment)
  .delete(CommentController.deleteComment);

router.route('/:blog_id')
  .get(CommentController.getAllComments)
  .post(CommentController.createNewComment);

router.route('/:id')
  .get(CommentController.getComment);

export default router;
