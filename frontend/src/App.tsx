import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className='flex flex-col min-h-screen bg-background'>
        <Navbar />
        <main className='flex-grow'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
