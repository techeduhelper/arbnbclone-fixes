import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: [true, 'Email already exist'],
        required: true
    },
    mobno: {
        type: Number,
        required: [true],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true })

export default mongoose.model('users', userSchema)