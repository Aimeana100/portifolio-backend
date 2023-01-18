import express from 'express';
import CategoriesController from '../../controllers/CategoriesController';
import verfyJWT from '../../middleware/verifyJWT';

const router = express.Router();
router.route('/')
  .get(CategoriesController.getAllCategories)
  .post(verfyJWT, CategoriesController.createNewCategory)
  .put(verfyJWT, CategoriesController.updateCategory)
  .delete(verfyJWT, CategoriesController.deleteCategory);

router.route('/:id')
  .get(CategoriesController.getCategory);

export default router;
