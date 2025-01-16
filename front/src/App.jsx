/* eslint-disable react/prop-types */
// import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import { UserProvider } from "./context/UserContext";
import Voting from "./pages/voting/Voting";
import Party from "./pages/parties/Party";
import Admin from "./pages/admin/Admin";

// PrivateRoute Component
const PrivateRoute = ({ element: Component, ...rest }) => {
  const userEmail = sessionStorage.getItem("userEmail");

  // If userEmail exists, render the component; otherwise, redirect to Home
  return userEmail ? <Component {...rest} /> : <Navigate to="/" />;
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/verification" element={<Voting />} />
          <Route path="/voting" element={<PrivateRoute element={Party} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
