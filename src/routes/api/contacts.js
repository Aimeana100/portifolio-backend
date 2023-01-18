import express from 'express';
import ContactsController from '../../controllers/ContactsController';
import verfyJWT from '../../middleware/verifyJWT';

const router = express.Router();

router.route('/')
  .get(verfyJWT, ContactsController.getAllContacts)
  .post(ContactsController.createNewContact)
  .put(verfyJWT, ContactsController.updateContact)
  .delete(verfyJWT, ContactsController.deleteContact);

router.route('/:id')
  .get(verfyJWT, ContactsController.getContact);

export default router;
