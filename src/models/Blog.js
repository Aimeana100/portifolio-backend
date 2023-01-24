import mongoose from 'mongoose';

const { Schema } = mongoose;
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    required: false,
  },
  status: {
    type: String,
    default: 'unmuted',
  },
});

export default mongoose.model('Blog', BlogSchema);
