import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Footer from "../Footer";

const AdminLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <AdminNavbar />
      <main className='flex-grow p-6'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
