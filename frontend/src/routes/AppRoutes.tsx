import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Footer from "../components/Footer";

const AppRoutes = () => {
  return (
    <Router>
      <div className='flex flex-col min-h-screen bg-background'>
        <Navbar />
        <main className='flex-grow px-5'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
