import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Prevents state update if component unmounts

    const logoutUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found, redirecting to login...");
          localStorage.clear();
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && isMounted) {
          console.log("Logout successful, clearing token...");
          localStorage.removeItem("token");
          localStorage.clear(); // Ensure all session data is cleared
          navigate("/login");
        }
      } catch (error) {
        console.error("Logout request failed:", error);
        if (isMounted) {
          localStorage.clear(); // Ensure user is logged out even if API fails
          navigate("/login");
        }
      }
    };

    logoutUser();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return null;
};

export default UserLogout;
