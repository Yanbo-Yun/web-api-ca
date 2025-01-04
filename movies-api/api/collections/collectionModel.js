import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
    userId: { type: String, required: true }, 
    movieId: { type: String, required: true }, 
    movieTitle: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Collection', collectionSchema);