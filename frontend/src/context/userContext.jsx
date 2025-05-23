import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_PATHS } from '../utils/apiPaths';

export const userContext = createContext({
  user: null,
  updateUser: () => {},
  clearUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Add useEffect to check for user data on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(API_PATHS.AUTH.GET_USER_INFO);
      updateUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };


  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <userContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;