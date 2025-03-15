import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// pages
const Login = lazy(() => import("../pages/login"));
const Register = lazy(() => import("../pages/Register"));
const Home = lazy(() => import("../pages/Home"));
const CarsBrowse = lazy(() => import("../pages/CarsBrowse"));
const CarDetails = lazy(() => import("../pages/CarDetails"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Profile = lazy(() => import("../pages/Profile"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));

// admin pages
const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const ManageCars = lazy(() => import("../pages/Admin/ManageCars"));
const ManageUsers = lazy(() => import("../pages/Admin/ManageUser"));
const ManageBookings = lazy(() => import("../pages/Admin/ManageBookings"));

// Layouts & Protected Routes
import UserLayout from "../components/UserLayout";
import AdminLayout from "../components/Admin/AdminLayout";
import AdminRoute from "./AdminRoutes";

// Loading fallback component
const Loading = () => (
  <div className='text-center text-lg p-10'>Loading...</div>
);

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* User Layout */}
          <Route element={<UserLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
            <Route path='/browse-cars' element={<CarsBrowse />} />
            <Route path='/cars/:id' element={<CarDetails />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Route>

          {/* Admin Routes (Protected) */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path='/admin' element={<AdminDashboard />} />
              <Route path='/admin/manage-cars' element={<ManageCars />} />
              <Route path='/admin/manage-users' element={<ManageUsers />} />
              <Route
                path='/admin/manage-bookings'
                element={<ManageBookings />}
              />
            </Route>
          </Route>

          {/* 404 Page */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
