
import Comment from "../models/Comment";
import Blog from "../models/Blog";
import mongoose from "mongoose";
const {ObjectId} = mongoose.Types; 

const getAllComments = async (req, res) => {
  if (!req?.params?.blog_id) {
    return res.status(400).json({ message: " No blog specified" });
  }else if(!ObjectId.isValid(req.params.blog_id)){
    return res
    .status(422)
    .json({"message" : "Blog Id should be a valid mongoose ObjectId"})
  }

  let blog_id = req.params.blog_id;

  let blog = await Blog.findById(blog_id);
  if (!blog) {
    return res.status(404).json({ message: "Blog with provided ID not found" });
  }

  const comments = await Blog.aggregate([
    {
      $match: { _id: ObjectId(blog_id) }
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
  console.log(comments)
  if (comments[0]?.comments.length < 1) return res.status(204).json({ message: "No comments found." });
  res.status(200).json(comments);
};

const createNewComment = async (req, res) => {
  if (!req?.body?.names || !req?.body?.email || !req?.body?.description) {
    return res
      .status(400)
      .json({ message: "User names , email and comment message is required" });
  }
  if (!req?.params?.blog_id) {
    return res.status(400).json({ message: " No blog specified" });
  } else if(!ObjectId.isValid(req.params.blog_id)){
    return res
    .status(422)
    .json({"message" : "Blog Id should be a valid mongoose ObjectId"})
  }

  try {
    const result = await Comment.create({
      names: req.body.names,
      email: req.body.email,
      description: req.body.description,
      status: req.body.status,
    });

    if (result) {
      let blog_id = req.params.blog_id;
       await Blog.updateMany(
        { _id: blog_id },
        { $push: { comments: result._id } }
      );
    }
    res.status(201);

    res.json(result);
    // res.status(201).json(result, { message: "Comment created successfully"});

    res.json(result, { message: "Comment created successfully" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateComment = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const comment = await Comment.findOne({ _id: req.body.id }).exec();
  if (!comment) {
    return res
      .status(204)
      .json({ message: `No comment matches ID ${req.body.id}.` });
  }
  if (req.body?.description) comment.description = req.body.description;
  if (req.body?.status) comment.status = req.body.status;
  const result = await comment.save();
  res.json(result);
};

const deleteComment = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Comment ID required." });

if(!ObjectId.isValid(req.params.blog_id)){
    return res
    .status(422)
    .json({"message" : "Comment Id should be a valid mongoose ObjectId"})
  }
  const comment = await Comment.findOne({ _id: req.body.id }).exec();
  if (!comment) {
    return res
      .status(204)
      .json({ message: `No comment matches ID ${req.body.id}.` });
  }
  const result = await comment.deleteOne();

  if (result) {
    let blog_id = req.params.blog_id;
     await Blog.updateMany(
      { _id: blog_id },
      { $pull: { comments: result._id } }
    );
  }
  res.json(result, {message: "Comment deleted successfully"});
};

const getComment = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Comment ID required." });

  const comment = await Comment.findOne({ _id: req.params.id }).exec();
  if (!comment) {
    return res
      .status(204)
      .json({ message: `No comment matches ID ${req.params.id}.` });
  }
  res.json(comment);
};

export default {
  getAllComments,
  createNewComment,
  updateComment,
  deleteComment,
  getComment,
};
