import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";
import { checkToken } from "../services/AuthService";
import Loading from "../components/Loading";

export const AdminProtectedLayout = () => {
  const { token, setRole } = useAuth();
  const [role, setRole_] = useState("loading");

  useEffect(() => {
    const handleGetRole = async () => {
      const response = await checkToken();
      if (response.success && response.data.data === "Admin") {
        setRole_(response.data.data);
        setRole(response.data.data);
      } else setRole_(null);
    };

    handleGetRole();
  }, [setRole]);

  if (!token || role === null) return <Navigate to="/login" />;
  if (role === "loading") return <Loading />;

  // If authenticated, render the child routes
  return <Outlet />;
};
