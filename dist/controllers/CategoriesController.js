"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Category = _interopRequireDefault(require("../models/Category"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable consistent-return */

const {
  ObjectId
} = _mongoose.default.Types;
const getAllCategories = async (req, res) => {
  const categories = await _Category.default.find();
  if (!categories) return res.status(204).json({
    message: 'No categories found.'
  });
  res.json(categories);
};
const createNewCategory = async (req, res) => {
  if (!req?.body?.name) {
    return res.status(400).json({
      message: ' category name is required'
    });
  }
  try {
    const result = await _Category.default.create({
      name: req.body.name,
      status: req.body.status
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
    console.error(err);
  }
};
const updateCategory = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({
      message: 'ID parameter is required.'
    });
  }
  const category = await _Category.default.findOne({
    _id: req.body.id
  }).exec();
  if (!category) {
    return res.status(204).json({
      message: `No category matches ID ${req.body.id}.`
    });
  }
  if (req.body?.name) category.name = req.body.name;
  if (req.body?.status) category.status = req.body.status;
  const result = await category.save();
  res.json(result);
};
const deleteCategory = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({
    message: 'Category ID required.'
  });
  if (!ObjectId.isValid(req.body.id)) {
    return res.status(422).json({
      message: 'Category Id should be a valid mongoose ObjectId'
    });
  }
  ;
  const category = await _Category.default.findOne({
    _id: req.body.id
  }).exec();
  if (!category) {
    return res.status(204).json({
      message: `No category matches ID ${req.body.id}.`
    });
  }
  const result = await category.deleteOne();
  res.json(result, {
    message: 'Category deleted successfully'
  });
};
const getCategory = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({
    message: 'Category ID required.'
  });
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({
      message: 'Category Id should be a valid mongoose ObjectId'
    });
  }
  ;
  const category = await _Category.default.findOne({
    _id: req.params.id
  }).exec();
  if (!category) {
    return res.status(204).json({
      message: `No category matches ID ${req.params.id}.`
    });
  }
  res.json(category);
};
var _default = {
  getAllCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
  getCategory
};
exports.default = _default;