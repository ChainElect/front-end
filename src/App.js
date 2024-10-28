import './App.css';
import FeatureSection from './components/FeatureSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import InfoSection from './components/InfoSection';
import Navbar from './components/Navbar';

const App = () => {

  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <InfoSection />
      <Footer />
    </div>
  );
}

export default App;
