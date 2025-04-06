import mongoose from "mongoose";
import { boolean } from "zod";


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
    sex: {
        type: String,
        required: true,
    },
    sterilized: {
        type: Boolean,
        required: true,
    },
    adopted: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
});

export const petModel = mongoose.model("pet", petSchema);