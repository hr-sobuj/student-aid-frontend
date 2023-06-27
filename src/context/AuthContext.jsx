import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const history = useNavigate();
  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState({
    access_token: '',
    email: '',
    name: '',
    role: '',
    status: '',
    _id: '',
  });
  const [userAllInfo, setUserAllInfo] = useState({});
  const [isDonorView, setIsDonorView] = useState(false);

  let userToken = localStorage.getItem('userToken');
  let userData = localStorage.getItem('userData');
  let userAllInformation = localStorage.getItem('userInfo');
  let view = localStorage.getItem('isDonorView');
  useEffect(() => {
    if (userToken) {
      setToken(userToken);
      setCurrentUser(JSON.parse(userData));
      setUserAllInfo(JSON.parse(userAllInformation));
      setIsDonorView(JSON.parse(view));
    }
  }, [userToken, userData, userAllInformation]);

  function Logout() {
    setCurrentUser({
      access_token: '',
      email: '',
      name: '',
      role: '',
      status: '',
      _id: '',
    });
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isDonorView');

    history('/login');
  }

  const value = {
    token,
    currentUser,
    Logout,
    setIsDonorView,
    isDonorView,
    userAllInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
