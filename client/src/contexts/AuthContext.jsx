import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { setHeaderToken } from '../services/api'

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }){
  // Store global auth properties & methods to access anywhere in our app
  let navigate = useNavigate()
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getCurrentUser();
    setUser(userData);
  }, [])

  // 1. Register & Login function
  const loginSaveUser = async (data) => {
    const { token } = data;
    localStorage.setItem("userToken", JSON.stringify(token));
    setUser(jwtDecode(token));
    setHeaderToken();
  }

  // 2. Retrieve the user from localStorage
  function getCurrentUser(){
    try {
      const token = localStorage.getItem("userToken");
      const savedUser = jwtDecode(token);
      return savedUser;
    } catch(error) {
      return null;
    }
  }

  // 3. Logout function
  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/login");
    setHeaderToken();
  }

  const value = {
    user,
    loginSaveUser,
    getCurrentUser,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;