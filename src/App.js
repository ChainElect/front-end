import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/Auth/Login";
import RegistrationForm from "./components/Auth/Register";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import HeroSection from "./components/Layouts/HeroSection";
import { MainPage } from "./components/Pages/MainPage";
import AdminDashboard from "./components/Pages/AdminDashboard";
import UserDashboard from "./components/Pages/UserDashboard";
import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
import injectedModules from "@web3-onboard/injected-wallets";
import ElectionResults from "./components/Pages/ElectionResults";
import About from "./components/Pages/About";
import Resources from "./components/Pages/Resourses";
import Home from "./components/Pages/Home";
import VotingPage from "./components/Pages/VotingPage";
import FAQ from "./components/Pages/FAQ";
import ContactUs from "./components/Pages/ContactUs";
import PrivacyPolicy from "./components/Pages/Privacy";
import TermsOfUse from "./components/Pages/TermsOfUse";
import VotingGuide from "./components/Pages/Guide/VotingGuide";
import ConnectWalletGuide from "./components/Pages/Guide/ConnectWallet";
import ResultsGuide from "./components/Pages/Guide/ResultsGuide";
const API_KEY = "89jSnaKWM_MxViGgmQyrTyS4xHMzXukz";
const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`;

const injected = injectedModules();

init({
  connect: {
    autoConnectLastWallet: true,
  },
  wallets: [injected],
  chains: [
    {
      id: "0xaa36a7",
      token: "ETH",
      label: "Ethereum Sepolia",
      rpcUrl,
    },
  ],
});

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
          <Route path="/results" element={<ElectionResults />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/home" element={<Home />} />
          <Route path="/voting" element={<VotingPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/guide/voting" element={<VotingGuide />} />
          <Route
            path="/guide/connect-wallet"
            element={<ConnectWalletGuide />}
          />
          <Route path="/guide/results" element={<ResultsGuide />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
