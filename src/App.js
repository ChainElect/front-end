import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/Auth/Login';
import RegistrationForm from './components/Auth/Register';
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;