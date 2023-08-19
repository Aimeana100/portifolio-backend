import mongoose from 'mongoose';

const { Schema } = mongoose;

const Position = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "unmuted"
  },
});

export default mongoose.model('Category', Position);