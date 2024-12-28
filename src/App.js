import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { init } from "@web3-onboard/react";
import injectedModules from "@web3-onboard/injected-wallets";

import { LoginForm } from "./features/auth/LoginForm";
import { RegisterForm } from "./features/auth/RegisterForm";
import { Navbar } from "./components/sections/Navbar";
import { Footer } from "./components/sections/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { MainPage } from "./pages/MainPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ElectionResults } from "./pages/ElectionResults";
import { About } from "./pages/About";
import { Resources } from "./pages/Resourses";
import { Home } from "./pages/Home";
import { VotingPage } from "./pages/VotingPage";
import { FAQ } from "./pages/FAQ";
import { ContactUs } from "./pages/ContactUs";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfUse } from "./pages/TermsOfUse";
import { AdminFunc } from "./pages/AdminFunc";
import { VotingGuide } from "./pages/guide/VotingGuide";
import { ConnectWalletGuide } from "./pages/guide/ConnectWallet";
import { ResultsGuide } from "./pages/guide/ResultsGuide";
import { OngoingElections } from "./pages/OnGoingElections";

// change from env file
const API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
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

export const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center min-w-80">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/connect" element={<RegisterForm />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/hero" element={<HeroSection />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* <Route path="/user" element={<UserDashboard />} /> */}
          <Route path="/results" element={<ElectionResults />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/voting" element={<VotingPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/adminfunc" element={<AdminFunc />} />
          <Route path="/onGoingElections" element={<OngoingElections />} />
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
};
