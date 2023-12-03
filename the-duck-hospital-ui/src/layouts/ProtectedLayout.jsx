import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Loading from "../components/Loading";
import { checkToken } from "../services/customer/AuthServices";

function ProtectedLayout(props) {
  const { forRole = [] } = props;
  const { token } = useAuth();
  const [role, setRole] = useState("loading");

  useEffect(() => {
    const handleCheckToken = async () => {
      const response = await checkToken();
      if (response.success && forRole.includes(response.data.data.role)) {
        setRole(response.data.data.role);
      } else setRole(null);
    };
    handleCheckToken();
  }, [forRole]);

  if (!token) {
    console.log("Missing token");
    return <Navigate to="/auth/login" />;
  }
  if (role === "loading") {
    console.log("Loading");
    return <Loading />;
  }
  if (role !== "loading" && !forRole.includes(role)) {
    console.log("Not authorized", forRole.includes(role));
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
