import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { init } from "@web3-onboard/react";
import injectedModules from "@web3-onboard/injected-wallets";

import { Navbar } from "./layouts/shared/Navbar";
import { LoginForm } from "./features/auth/LoginForm";
import { RegisterForm } from "./features/auth/RegisterForm";
import { MainPage } from "./pages/MainPage";
import { HeroSection } from "./components/sections/HeroSection";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ElectionResults } from "./pages/public/ElectionResults";
import { OngoingElections } from "./pages/user/OnGoingElections";
import { About } from "./pages/public/About";
import { Resources } from "./pages/user/Resourses";
import { Home } from "./pages/public/Home";
import { VotingPage } from "./pages/user/VotingPage";
import { FAQ } from "./pages/public/FAQ";
import { ContactUs } from "./pages/public/ContactUs";
import { PrivacyPolicy } from "./pages/public/PrivacyPolicy";
import { TermsOfUse } from "./pages/public/TermsOfUse";
import { AdminFunc } from "./pages/admin/AdminFunc";
import { VotingGuide } from "./pages/guide/VotingGuide";
import { ConnectWalletGuide } from "./pages/guide/ConnectWallet";
import { ResultsGuide } from "./pages/guide/ResultsGuide";
import { Footer } from "./layouts/shared/Footer";
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
