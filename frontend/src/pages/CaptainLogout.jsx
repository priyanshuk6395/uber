import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Prevents state updates if component unmounts

    const logoutCaptain = async () => {
      try {
        const token = localStorage.getItem("captoken");

        if (!token) {
          console.warn("No token found, redirecting to login...");
          localStorage.clear();
          navigate("/CaptainLogin");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captain/logout`,
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
          navigate("/CaptainLogin");
        }
      } catch (error) {
        console.error("Logout request failed:", error);
        if (isMounted) {
          localStorage.clear(); // Ensure captain is logged out even if API fails
          navigate("/CaptainLogin");
        }
      }
    };

    logoutCaptain();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return null;
};

export default CaptainLogout;
