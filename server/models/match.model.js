import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    whitePlayerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    blackPlayerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    winnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    endedAt: {type: Date, default: Date.now()}
})

export const Match = mongoose.model("Match", matchSchema)