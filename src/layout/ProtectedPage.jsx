import { Outlet, Navigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

function ProtectedPage() {
  const { token } = useAuth();
  return <main>{token ? <Outlet /> : <Navigate to="/books" />}</main>;
}

export default ProtectedPage;
