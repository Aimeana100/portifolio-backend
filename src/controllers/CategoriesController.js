/* eslint-disable consistent-return */
import Category from '../models/Category';
import mongoose from 'mongoose';
const {ObjectId} = mongoose.Types;
 
const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  if (!categories) return res.status(204).json({ message: 'No categories found.' });
  res.json(categories);
};

const createNewCategory = async (req, res) => {
  if (!req?.body?.name) {
    return res.status(400).json({ message: ' category name is required' });
  }

  
    const result = await Category.create({
      name: req.body.name,
      status: req.body.status,
    });

    res.status(201).json({result, message: 'Category created successfully'});

};

const updateCategory = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required.' });
  }

  const category = await Category.findOne({ _id: req.body.id }).exec();
  if (!category) {
    return res.status(204).json({ message: `No category matches ID ${req.body.id}.` });
  }
  if (req.body?.name) category.name = req.body.name;
  if (req.body?.status) category.status = req.body.status;
  const result = await category.save();
  res.status(200).json(result);
};

const deleteCategory = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: 'Category ID required.' });

  if (!ObjectId.isValid(req.body.id))  {
    return res
      .status(422)
      .json({ message: 'Category Id should be a valid mongoose ObjectId' });
  } ;

  const category = await Category.findOne({ _id: req.body.id }).exec();
  if (!category) {
    return res.status(204).json({ message: `No category matches ID ${req.body.id}.` });
  }
  const result = await category.deleteOne();
  res.json(result, {message: 'Category deleted successfully'});
};

const getCategory = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ message: 'Category ID required.'});

  if (!ObjectId.isValid(req.params.id))  {
    return res
      .status(422)
      .json({ message: 'Category Id should be a valid mongoose ObjectId' });
  } ;

  const category = await Category.findOne({ _id: req.params.id }).exec();
  if (!category) {
    return res.status(204).json({ message: `No category matches ID ${req.params.id}.` });
  }
  res.json(category);
};

export default {
  getAllCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};
