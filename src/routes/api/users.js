import express from 'express';
const router = express.Router();
import usersController from '../../controllers/usersController';

router.route('/')
    .get( usersController.getAllUsers)
    .delete( usersController.deleteUser);

router.route('/:id')
    .get(usersController.getUser);

module.exports = router;