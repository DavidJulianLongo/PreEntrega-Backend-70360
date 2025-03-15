import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    pets: {
        type: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'pet'
            }
        }],
        default: []
    },
    role: {
        type: String,
        default: "user"
    },
});

export const userModel = mongoose.model("user", userSchema);