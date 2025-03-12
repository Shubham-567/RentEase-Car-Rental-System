import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import CarsBrowse from "../pages/CarsBrowse";
import Footer from "../components/Footer";
import CarDetails from "../pages/CarDetails";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <main className='flex-grow'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
            <Route path='/browse-cars' element={<CarsBrowse />} />
            <Route path='/cars/:id' element={<CarDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
