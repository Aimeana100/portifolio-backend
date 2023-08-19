import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  names: {
    type: String,
    required: true,
  },
  telpohone: {
    type: String,
    required: true,
  }
});

export default mongoose.model('User', userSchema);
