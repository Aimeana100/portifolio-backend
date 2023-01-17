import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
    required : true
  }
});

export default mongoose.model("Contact", contactSchema);
