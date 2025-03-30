import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pet"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
});

export const adoptionModel = mongoose.model("adoption", adoptionSchema);