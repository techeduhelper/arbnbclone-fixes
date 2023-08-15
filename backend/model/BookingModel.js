import mongoose from 'mongoose';


const bookingSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'place' },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    name: { type: String, required: true },
    mobno: { type: String, required: true },
    price: String,
    guest: Number
}, { timestamps: true })


export default mongoose.model('booking', bookingSchema)