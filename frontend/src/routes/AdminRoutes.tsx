import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import NotFound from "../pages/NotFound";

const AdminRoute = () => {
  const { user, loading } = useUserStore();

  if (loading) return null;

  if (!user) {
    return <Navigate to='/login' />;
  }

  if (user.role === "customer") {
    return (
      <NotFound
        title='Access Denied'
        message='You don’t have permission to view this page. Please log in as an admin to proceed.'
      />
    );
  }

  return user.role === "admin" && <Outlet />;
};

export default AdminRoute;
