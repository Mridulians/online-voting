import { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Voting = () => {
    const navigate = useNavigate();
  const { setUserEmail } = useContext(UserContext);
  const [name, setName] = useState(""); // Added state for name
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state

  const length = 6; // Length of OTP
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const sendOtp = async () => {
    if (!name || !email) {
      alert("Please fill in both name and email.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/send-otp", { name, email });
      alert("OTP sent to your email!");
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send OTP.");
      console.log(err, "Error in sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (finalOtp) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/verify-otp", {
        email,
        otp: finalOtp,
      });
      alert(res.data.message);
      setUserEmail(email);
       
      setTimeout(()=>{
        navigate("/voting");
      }, 1500)

    } catch (err) {
      alert(err.response?.data?.error || "Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const finalOtp = newOtp.join("");
    if (finalOtp.length === length) {
      verifyOtp(finalOtp);
    }

    if (value && inputRefs.current[index + 1] && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      inputRefs.current[index - 1] &&
      index > 0 &&
      !otp[index]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (otpSent && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [otpSent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex justify-center items-center p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg text-white">
        {!otpSent ? (
          <>
            <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Enter Your Details
            </h2>
            <input
              type="text"
              required
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 mb-4 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-sm"
            />
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 mb-6 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-sm"
            />
            <button
              onClick={sendOtp}
              className={`w-full py-3 font-bold ${
                loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600"
              } text-white rounded-lg hover:bg-blue-500 focus:ring-4 focus:ring-blue-400 shadow-md transition-all duration-300`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              Enter OTP
            </h2>
            <div className="flex justify-center mb-6">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  value={value}
                  ref={(input) => (inputRefs.current[index] = input)}
                  onChange={(e) => handleChange(index, e)}
                  onClick={() => handleClick(index)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 mx-2 bg-gray-700 rounded-lg text-center text-white text-lg focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-sm"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Voting;
