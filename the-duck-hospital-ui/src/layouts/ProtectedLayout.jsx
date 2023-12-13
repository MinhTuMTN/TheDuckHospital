import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Loading from "../components/General/Loading";
import { checkToken } from "../services/customer/AuthServices";
import { enqueueSnackbar } from "notistack";

function ProtectedLayout(props) {
  const { forRole = [] } = props;
  const { token } = useAuth();
  const [role, setRole] = useState("loading");

  useEffect(() => {
    const handleCheckToken = async () => {
      const response = await checkToken();
      if (response.success) {
        setRole(response.data.data.role);
      } else {
        setRole(null);
        enqueueSnackbar("Vui lòng đăng nhập để tiếp tục", { variant: "error" });
      }
    };
    handleCheckToken();
  }, []);

  if (!token) {
    console.log("Missing token");
    return <Navigate to="/auth/login" />;
  }
  if (role === "loading") {
    return <Loading />;
  }
  if (role !== "loading" && !forRole.includes(role)) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
