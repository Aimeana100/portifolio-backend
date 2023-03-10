/* eslint-disable consistent-return */
import mongoose from "mongoose";
import Blog from "../models/Blog";
import Category from "../models/Category";
import cloudinary from "../config/cloudinary";
const { ObjectId } = mongoose.Types;

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.aggregate([
    {
      $lookup: {
        from: "comments",
        localField: "comments",
        foreignField: "_id",
        as: "comments",
      },
    },
  ]);

  if (!blogs) return res.status(204).json({ message: "No blogs found." });
  res.status(200).json(blogs);
};

const createNewBlog = async (req, res) => {
  if (
    !req?.body?.title ||
    !req?.body?.description ||
    !req?.file ||
    !req?.body?.category
  ) {
    return res
      .status(400)
      .json({
        status: 400,
        cat: req.body.category,
        message: "blog category, Title, Description and Image are required",
      });
  }

  if (!ObjectId.isValid(req.body.category)) {
    return res
      .status(422)
      .json({ message: "Id should be a valid mongoose ObjectId" });
  }

  const ctg = await Category.findOne({ _id: req.body.category }).exec();
  if (!ctg) {
    return res
      .status(204)
      .json({ message: `No Category matches ID ${req.params.id}.` });
  }

  const imgResult = await cloudinary.uploader.upload(req.file.path);

  const { title, category, description } = req.body;

  const blog = {
    title,
    category,
    description,
    image: {
      url: imgResult.secure_url,
      id: imgResult.public_id,
    },
  };

  const result = await Blog.create(blog);
  res.status(201).json({ result, message: "Blog created successfully" });
};

const updateBlog = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  if (!ObjectId.isValid(req.body.id)) {
    return res
      .status(422)
      .json({ message: "Id should be a valid mongoose ObjectId" });
  }

  const blog = await Blog.findOne({ _id: req.body.id }).exec();
  if (!blog) {
    return res
      .status(204)
      .json({ message: `No blog matches ID ${req.body.id}.` });
  }
  if (req.body?.title) blog.title = req.body.title;
  if (req.body?.description) blog.description = req.body.description;
  if (req.body?.category) blog.category = req.body.category;
  if (req.body?.status) blog.status = req.body.status === "muted" ? "unmuted" : "muted";

  if (req.file) {
    // console.log(req.file)
    const imgResult = await cloudinary.uploader.upload(req.file.path);
    blog.image = {
      url: imgResult.secure_url,
      id: imgResult.public_id,
    };
  }
  const result = await blog.save();
  res.status(200).json({result, message: 'Blog updated successfully'});
};

const deleteBlog = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Blog ID required." });
  }

  if (!ObjectId.isValid(req.body.id)) {
    return res
      .status(422)
      .json({ message: "Id should be a valid mongoose ObjectId" });
  }

  const blog = await Blog.findOne({ _id: req.body.id }).exec();
  if (!blog) {
    return res
      .status(204)
      .json({ message: `No blog matches ID ${req.body.id}.` });
  }
  const result = await blog.deleteOne();
  res.status(200).json({result, message: 'Blog deleted successfully'});
};

const getBlog = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(422)
      .json({ message: "Id should be a valid mongoose ObjectId" });
  }

  const blog = await Blog.aggregate([
    {
      $match: { _id: ObjectId(req.params.id) },
    },
    {
      $lookup: {
        from: "comments",
        localField: "comments",
        foreignField: "_id",
        as: "comments",
      },
    },
  ]);
  if (!blog) {
    return res
      .status(204)
      .json({ message: `No blog matches ID ${req.params.id}.` });
  }
  res.status(200).json({ blog: blog[0], message: "successfully " });
};

export default {
  getAllBlogs,
  createNewBlog,
  updateBlog,
  deleteBlog,
  getBlog,
};
