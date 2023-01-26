"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _Contact = _interopRequireDefault(require("../models/Contact"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  ObjectId
} = _mongoose.default.Types;
const getAllContacts = async (req, res) => {
  const contacts = await _Contact.default.find();
  if (!contacts) return res.status(204).json({
    'message': 'No contacts found.'
  });
  res.status(200).json(contacts);
};
const createNewContact = async (req, res) => {
  if (!req?.body?.names || !req?.body?.email || !req?.body?.description) {
    return res.status(400).json({
      'message': 'Query names, email, and message are required'
    });
  }
  try {
    const result = await _Contact.default.create({
      names: req.body.names,
      email: req.body.email,
      description: req.body.description
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      'message': ` ${err}`
    });
  }
};
const updateContact = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({
      'message': 'ID parameter is required.'
    });
  }
  const contact = await _Contact.default.findOne({
    _id: req.body.id
  }).exec();
  if (!contact) {
    return res.status(204).json({
      "message": `No contact matches ID ${req.body.id}.`
    });
  }
  if (req.body?.names) contact.names = req.body.names;
  if (req.body?.email) contact.email = req.body.email;
  if (req.body?.description) contact.description = req.body.description;
  const result = await contact.save();
  res.json(result, {
    "message": "Updated successfully"
  });
};
const deleteContact = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({
    'message': 'Contact ID required.'
  });
  if (!ObjectId.isValid(req.body.id)) {
    return res.status(422).json({
      message: 'Id should be a valid mongoose ObjectId'
    });
  }
  ;
  const contact = await _Contact.default.findOne({
    _id: req.body.id
  }).exec();
  if (!contact) {
    return res.status(204).json({
      "message": `No contact matches ID ${req.body.id}.`
    });
  }
  const result = await contact.deleteOne();
  res.json(result, {
    "message": "deleted successfully"
  });
};
const getContact = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({
    'message': 'Contact ID required.'
  });
  const contact = await _Contact.default.findOne({
    _id: req.params.id
  }).exec();
  if (!contact) {
    return res.status(204).json({
      "message": `No contact matches ID ${req.params.id}.`
    });
  }
  res.json(contact);
};
var _default = {
  getAllContacts,
  createNewContact,
  updateContact,
  deleteContact,
  getContact
};
exports.default = _default;