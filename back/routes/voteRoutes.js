import express from "express";
import { voteForParty, getPartyVotes } from "../controllers/partyVoteController.js";

const router = express.Router();

// Route to handle voting
router.post("/vote", voteForParty);

// Route to fetch all votes
router.get("/votes", getPartyVotes);

export default router;
