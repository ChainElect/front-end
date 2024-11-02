import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/Auth/Login";
import RegistrationForm from "./components/Auth/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import { MainPage } from "./components/Pages/MainPage";
import AdminDashboard from "./components/Pages/AdminDashboard";
import UserDashboard from "./components/Pages/UserDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center min-w-80">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/connect" element={<RegistrationForm />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/hero" element={<HeroSection />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
