import mongoose from "mongoose";

const partyVoteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Ensure unique party names
  votes: { type: Number, default: 0 }, // Keep track of votes
});

export const PartyVote = mongoose.model("PartyVote", partyVoteSchema);
