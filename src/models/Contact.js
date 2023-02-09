import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactSchema = new Schema({
  names: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at:{
    type: Object,
    default: new Date(),
  }
});

export default mongoose.model('Contact', contactSchema);
