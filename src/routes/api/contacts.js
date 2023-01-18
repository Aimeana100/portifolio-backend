import express from 'express';
import ContactsController from '../../controllers/ContactsController';
const router = express.Router();

router.route('/')
    .get(ContactsController.getAllContacts)
    .post( ContactsController.createNewContact)
    .put( ContactsController.updateContact)
    .delete(ContactsController.deleteContact);

router.route('/:id')
    .get(ContactsController.getContact);

export default router;