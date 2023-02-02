import mongoose from 'mongoose';
import Contact  from '../models/Contact';
const {ObjectId} = mongoose.Types;

const getAllContacts = async (req, res) => {
    const contacts = await Contact.find();
    if (!contacts) return res.status(204).json({contacts,  'message': 'No contacts found.' });
    res.status(200).json(contacts);
}

const createNewContact = async (req, res) => {
    if (!req?.body?.names || !req?.body?.email || !req?.body?.description) {
        return res.status(400).json({ 'message': 'Query names, email, and message are required' });
    }

   
        const result = await Contact.create({
            names: req.body.names,
            email: req.body.email,
            description: req.body.description
        });

        res.status(201).json({result, message: 'Contact created successfully.'});
 
}

const deleteContact = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Contact ID required.' });


  if (!ObjectId.isValid(req.body.id))  {
    return res
      .status(422)
      .json({ message: 'Id should be a valid mongoose ObjectId' });
  } ;

    const contact = await Contact.findOne({ _id: req.body.id }).exec();
    if (!contact) {
        return res.status(204).json({ "message": `No contact matches ID ${req.body.id}.` });
    }
    const result = await contact.deleteOne(); 
    res.json(result,{ "message": "deleted successfully" });
}

const getContact = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Contact ID required.' });

    const contact = await Contact.findOne({ _id: req.params.id }).exec();
    if (!contact) {
        return res.status(204).json({ "message": `No contact matches ID ${req.params.id}.` });
    }
    res.json(contact);
}

export default { getAllContacts, createNewContact, deleteContact, getContact };