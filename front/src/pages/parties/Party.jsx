import {useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext"; // Import UserContext
import Img1 from "../../assets/Bjp.png";
import Img2 from "../../assets/Congress.png";
import Img3 from "../../assets/Aap.webp";
import Img4 from "../../assets/Bsp.png";
import Img5 from "../../assets/Nota.png";

const Party = () => {
  const navigate = useNavigate();
  const { setUserEmail } = useContext(UserContext); // Access context to update userEmail

  const parties = [
    { id: "1", name: "Bharatiya Janata Party (BJP)", leader: "Narendra Modi", image: Img1 },
    { id: "2", name: "Indian National Congress (INC)", leader: "Rahul Gandhi", image: Img2 },
    { id: "3", name: "Aam Aadmi Party (AAP)", leader: "Arvind Kejriwal", image: Img3 },
    { id: "4", name: "Bahujan Samaj Party (BSP)", leader: "Mayawati", image: Img4 },
    { id: "5", name: "None of the Above (NOTA)", leader: "None", image: Img5 },
  ];

  const [selectedParty, setSelectedParty] = useState(null);
  const [loading, setLoading] = useState(false);

  const logOut = () => {
    sessionStorage.removeItem("userEmail");
    setUserEmail(null); // Update context to reflect logout
  };

  const handleVote = async () => {
    if (!selectedParty) {
      alert("Please select a party to vote.");
      return;
    }

    const selectedPartyName = parties.find((party) => party.id === selectedParty)?.name;

    try {
      setLoading(true);
      await axios.post("https://online-voting-v119.onrender.com/api/vote", { name: selectedPartyName });
      alert("Your Vote Casted..");
      logOut();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("An error occurred while casting your vote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Vote for Your Party</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {parties.map((party) => (
          <div
            key={party.id}
            onClick={() => setSelectedParty(party.id)}
            className={`bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300 ${
              selectedParty === party.id ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <img src={party?.image} alt={party.name} className="w-32 object-cover rounded-full mb-4 bg-white" />
            <h2 className="text-xl font-bold text-white mb-2">{party.name}</h2>
            <p className="text-gray-400 mb-4">Leader: {party.leader}</p>
            <input
              type="radio"
              name="party"
              id={party.id}
              value={party.id}
              checked={selectedParty === party.id}
              onChange={() => setSelectedParty(party.id)}
              className="w-6 h-6 text-blue-600 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleVote}
        className={`mt-8 ${loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-500"} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300`}
        disabled={loading}
      >
        {loading ? "Casting Your Vote..." : "Cast Your Vote"}
      </button>
    </div>
  );
};

export default Party;
