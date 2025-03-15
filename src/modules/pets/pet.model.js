import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    adopted: {
        type: String,
        required: true,
        default: false
    },
    owners: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            default: []
        }],
    }
});

export const petModel = mongoose.model("pet", petSchema);