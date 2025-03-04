import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserProtectedWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const {user, setUser} = useContext(UserDataContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    const authenticateUser = async () => {
    
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data);
          
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default UserProtectedWrapper;
