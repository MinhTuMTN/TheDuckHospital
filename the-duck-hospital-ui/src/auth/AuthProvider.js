import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { updateToken } from "../services/AxiosInstance";
// import { checkToken } from "../services/AuthService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [role, setRole_] = useState("");

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setRole = (newRole) => {
    setRole_(newRole);
  };

  // const handleCheckToken = useCallback(async () => {
  //   const response = await checkToken();
  //   if (response.success) {
  //     setRole_(response.data.data);
  //   } else {
  //     setRole_(null);
  //   }
  // }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      updateToken(token);

      // handleCheckToken();
    } else {
      localStorage.removeItem("token");
      updateToken(null);
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      role,
      setRole,
    }),
    [token, role]
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
