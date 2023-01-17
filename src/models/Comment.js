import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  names: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comment_date : {
    type: Date,
    required: true,
    default: new Date(),
  },
  status: {
    type: String,
    default: "muted",
  }
});

export default mongoose.model('Comment', CommentSchema);
