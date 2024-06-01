import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { updateToken } from "../services/AxiosInstance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [fullName, setFullName_] = useState(localStorage.getItem("fullName"));
  const [role, setRole_] = useState(localStorage.getItem("role"));
  const [nurseType, setNurseType_] = useState(
    localStorage.getItem("nurseType")
  );

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setFullName = (newFullName) => {
    setFullName_(newFullName);
  };

  const setRole = (newRole) => {
    setRole_(newRole);
  };

  const setNurseType = (newNurseType) => {
    setNurseType_(newNurseType);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      updateToken(token);
    } else {
      localStorage.removeItem("token");
      updateToken(null);
    }
  }, [token]);

  useEffect(() => {
    if (fullName) {
      localStorage.setItem("fullName", fullName);
    } else {
      localStorage.removeItem("fullName");
    }
  }, [fullName]);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  useEffect(() => {
    if (nurseType) {
      localStorage.setItem("nurseType", nurseType);
    } else {
      localStorage.removeItem("nurseType");
    }
  }, [nurseType]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      fullName,
      setFullName,
      role,
      setRole,
      nurseType,
      setNurseType,
    }),
    [token, fullName, role, nurseType]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
