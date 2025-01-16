import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [votesData, setVotesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const adminCredentials = {
    id: "admin",
    password: "securepassword123", // Replace with your credentials
  };

  const [winner, setWinner] = useState("");

  const handleLogin = () => {
    if (id === adminCredentials.id && password === adminCredentials.password) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid ID or Password. Please try again.");
    }
  };

  const fetchVotes = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/votes");
      const data = await response.json();
      setVotesData(data);

      // Determine the winner
      const maxVotesParty = data.reduce((max, party) =>
        party.votes > max.votes ? party : max
      );

      // Check if NOTA has the highest votes
      if (maxVotesParty.name === "None of the Above (NOTA)") {
        // Find the second highest party excluding NOTA
        const secondMaxVotesParty = data
          .filter((party) => party.name !== "None of the Above (NOTA)")
          .reduce((max, party) => (party.votes > max.votes ? party : max), {
            votes: -1,
          });

        setWinner(secondMaxVotesParty.name || "No Party Eligible");
      } else {
        setWinner(maxVotesParty.name);
      }
    } catch (error) {
      console.error("Error fetching votes data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchVotes();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white p-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <input
            type="text"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const barChartData = {
    labels: votesData.map((party) => party.name),
    datasets: [
      {
        label: "Votes",
        data: votesData.map((party) => party.votes),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4bc0c0",
          "#9966ff",
        ],
      },
    ],
  };

  const pieChartData = {
    labels: votesData.map((party) => party.name),
    datasets: [
      {
        label: "Votes",
        data: votesData.map((party) => party.votes),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4bc0c0",
          "#9966ff",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">
        Current Winner: {loading ? "Loading..." : winner || "No Votes Yet"}
      </h1>
      <div className="flex flex-col items-center">
        <div className="mb-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-4">
            Vote Distribution
          </h2>
          <Bar data={barChartData} />
        </div>
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-4">Vote Share</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
