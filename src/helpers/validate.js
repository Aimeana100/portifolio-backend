import mongoose from 'mongoose';
const {ObjectId} = mongoose.Types;
 
 
 const validateObjectId = (id) => {
    return (ObjectId.isValid(id));
}
export default {validateObjectId};