import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, required: true },
    address: { type: String, required: true },
    photos: [String],
    description: String,
    extrainfo: String,
    price: Number,
    checkin: String,
    checkout: String,
    maxguest: Number,
    perks: [String],
}, { timestamps: true });

export default mongoose.model('place', placeSchema);


