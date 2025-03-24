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
        type: Date,
        required: true
    },
    adopted: {
        type: Boolean,
        default: false
    },
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }],
});

export const petModel = mongoose.model("pet", petSchema);