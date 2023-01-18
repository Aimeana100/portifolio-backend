import express from 'express';
import CategoriesController from '../../controllers/CategoriesController.js';
const router = express.Router();
router.route('/')
    .get(CategoriesController.getAllCategories)
    .post( CategoriesController.createNewCategory)
    .put( CategoriesController.updateCategory)
    .delete(CategoriesController.deleteCategory);

router.route('/:id')
    .get(CategoriesController.getCategory);

module.exports = router;