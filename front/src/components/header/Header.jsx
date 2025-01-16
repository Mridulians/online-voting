import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // State to manage dropdown visibility
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userEmail, setUserEmail } = useContext(UserContext);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logOut = () => {
    setUserEmail("");
    alert("Logged out successfully");
  };

  return (
    <div className="bg-gray-800 p-6 flex flex-col sm:flex-row gap-[1.5rem] sm:gap-[0rem] justify-between items-center">
      <h2
        className="text-white text-[30px] font-[system-ui] cursor-pointer"
        onClick={() => navigate("/")}
      >
        Online Voting
      </h2>

      <div className="flex items-center flex-row justify-center gap-[25px] sm:gap-[2rem]">
        <h2 className="text-white font-[700] text-[20px] cursor-pointer" onClick={()=>navigate('/admin')}>Admin Panel</h2>

        {userEmail && (
          <div className="relative">
            {/* Dropdown trigger button */}
            <button
              onClick={toggleDropdown}
              className="text-white bg-gray-700 px-4 py-2 rounded-md flex items-center"
            >
              {userEmail.slice(0, 3)}... {userEmail.slice(-3)}{" "}
              {/* User email */}
              <span className="ml-2">&#x25BC;</span> {/* Dropdown icon */}
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                  {userEmail.slice(0, 3)}... {userEmail.slice(-3)}{" "}
                  {/* User email */}
                </button>
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={logOut}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
