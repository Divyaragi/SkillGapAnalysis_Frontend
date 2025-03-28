import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UserCircle } from "lucide-react"; 
import "./Topbar.css";

const Topbar = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    const token = Cookies.get("result"); 
    if (token) {
      try {
        const decodedToken = jwtDecode(token);        
        setUserData({
          name: decodedToken.name,
          email: decodedToken.upn || decodedToken.email || "No Email", 
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);
  console.log("userData**********",userData);
  
  return (
    <div className="topbar-container">
    <div className="flex justify-between items-center h-full px-4">
      <h1 className="text-xl font-semibold">SGA</h1>
      <div className="flex items-center space-x-3">
        <UserCircle className="w-8 h-8 text-gray-600 text-white" />
        <span className="font-medium">{userData.name}</span>
      </div>
    </div>
  </div>
  );
};

export default Topbar;
