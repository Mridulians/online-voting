import { PartyVote } from "../model/PartyVote.js";

// Controller to handle voting
export const voteForParty = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "Party name is required" });
    }

    // Find the party by name
    let party = await PartyVote.findOne({ name });

    if (party) {
      // If the party exists, increment its vote count
      party.votes += 1;
      await party.save();
      res.status(200).json({ message: `Vote added to ${name}`, votes: party.votes });
    } else {
      // If the party doesn't exist, create a new entry
      party = new PartyVote({ name, votes: 1 });
      await party.save();
      res.status(201).json({ message: `${name} has been added and received its first vote.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while voting." });
  }
};

// Controller to get all party votes
export const getPartyVotes = async (req, res) => {
  try {
    const parties = await PartyVote.find({});
    res.status(200).json(parties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch party votes." });
  }
};
