import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import CarsBrowse from "../pages/CarsBrowse";
import CarDetails from "../pages/CarDetails";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import UserLayout from "../components/UserLayout";
import AdminLayout from "../components/Admin/AdminLayout";
import AdminRoute from "./AdminRoutes";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageCars from "../pages/Admin/ManageCars";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* User Layout */}
        <Route element={<UserLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/' element={<Home />} />
          <Route path='/browse-cars' element={<CarsBrowse />} />
          <Route path='/cars/:id' element={<CarDetails />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

        {/* Admin Routes (Protected) */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/admin/manage-cars' element={<ManageCars />} />
          </Route>
        </Route>

        {/* 404 pages */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
