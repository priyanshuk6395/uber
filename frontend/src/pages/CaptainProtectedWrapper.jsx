import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("captoken");

  useEffect(() => {
    const authenticateCaptain = async () => {
      if (!token) {
        navigate("/CaptainLogin");
        return;
      }
  
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Since there's no 'captain' key, store the entire response.data object
        if (response?.status === 200 && response?.data) {
          setCaptain(response.data);  // Store the whole response.data
        } else {
          throw new Error("Invalid captain data structure");
        }
      } catch (error) {
        console.error("Error fetching captain profile:", error);
        localStorage.removeItem("captoken");
        setCaptain(null);
        navigate("/CaptainLogin");
      } finally {
        setIsLoading(false);
      }
    };
  
    authenticateCaptain();
  }, [navigate, setCaptain, token]);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
