import express from 'express';
import verfyJWT from '../../middleware/verifyJWT';
import usersController from '../../controllers/usersController';

const router = express.Router();

router.route('/')
    .get(verfyJWT,  usersController.getAllUsers)
    .delete(verfyJWT, usersController.deleteUser);

router.route('/:id')
    .get(verfyJWT, usersController.getUser);

module.exports = router;