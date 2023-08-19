import mongoose from 'mongoose';

const { Schema } = mongoose;

const VotesSchema = new Schema({
  user: {
    type: Number,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  candidate: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Votes', VotesSchema);
