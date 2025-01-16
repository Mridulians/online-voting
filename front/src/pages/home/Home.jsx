import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 text-white flex flex-col justify-center items-center p-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-gray-200 text-transparent bg-clip-text animate-pulse">
          <Typewriter
            words={[
              "Welcome to Online Voting",
              "Your Vote, Your Voice.",
              "Secure, Reliable, Fast.",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Make your voice count with our secure and reliable online voting
          platform.
        </p>
      </div>

      {/* Voting Button */}
      <div>
        <button
          onClick={() => navigate("/verification")}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg transform transition-transform hover:scale-105"
        >
          Vote Now
        </button>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-400">Easy to Use</h3>
          <p className="mt-2 text-gray-300">
            Our platform is designed for simplicity and ease of access.
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-green-400">Secure Voting</h3>
          <p className="mt-2 text-gray-300">
            Your votes are protected with top-notch security.
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-400">Fast Results</h3>
          <p className="mt-2 text-gray-300">
            Get real-time results and updates instantly.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-16 text-center text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Online Voting Platform. All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
};

export default Home;
