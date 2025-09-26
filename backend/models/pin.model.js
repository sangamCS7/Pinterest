import mongoose from 'mongoose';

const pinSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    imageUrl: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Pin = mongoose.model('Pin', pinSchema);
export default Pin;

