import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/auth/register', formData, config);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data.token,
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/auth/login', formData, config);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data.token,
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
