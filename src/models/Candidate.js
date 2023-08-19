import mongoose from 'mongoose';

const { Schema } = mongoose;
const CandidateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  created_at: {
    type: Object,
    default: new Date()
  }
});

export default mongoose.model('Candidate', CandidateSchema);
