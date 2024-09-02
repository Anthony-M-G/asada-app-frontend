import { useContext, createContext, useState, useEffect } from "react";
import { login } from "../api/config.js";
import Cookie from "js-cookie";
import { verifyToken } from "../api/config.js";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signIn = async (username, cedula, password) => {
    try {
      const response = await login(username, cedula, password);
      console.log(response);
      if (response.error) {
        alert(response.error);
      } else {
        const { username, cedula } = response.user;
        setUser({ username, cedula });
        setIsAuthenticated(true);
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const token = Cookie.get("token");
    console.log(token);
    const verify = async () => {
      const response = await verifyToken(token);
      console.log(response);
      if (response.error) {
        setIsAuthenticated(false);
        setLoading(false);
      } else {
        const { username, cedula } = response;
        setUser({ username, cedula });
        setIsAuthenticated(true);
        setLoading(false);
      }
    };
    if (token) {
      verify();
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isAuthenticated,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
