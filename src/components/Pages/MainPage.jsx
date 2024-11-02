import FeatureSection from "../FeatureSection";
import InfoSection from "../InfoSection";

export const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        <InfoSection />
        <FeatureSection />
        <FeatureSection />
      </div>
    </div>
  );
};
