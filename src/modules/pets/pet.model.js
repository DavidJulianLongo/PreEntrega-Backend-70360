import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specie: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    adopted: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    owners: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }],
    }
});

export const userModel = mongoose.model("pet", petSchema);