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
        _id: false,
        type: {
            street: {
                type: String,
                required: true
            },
            number: {
                type: Number,
                required: true
            },
            apartment: {
                type: String,
                default: ""
            },
            city: {
                type: String,
                required: true
            },
        },
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    pets: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "pet"
    }]

});

export const userModel = mongoose.model("user", userSchema);