import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const AdminRoute = () => {
  const { user, loading } = useUserStore();

  if (loading) return null;

  if (!user) {
    return <Navigate to='/login' />;
  }

  return user.role === "admin" ? <Outlet /> : <Navigate to='/' />;
};

export default AdminRoute;
