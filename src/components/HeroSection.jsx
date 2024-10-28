import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-8">
        {/* Left Side - Text */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Електронно <span className="text-green-400">гласуване</span><br /> посредством блокчейн
          </h1>
        </div>
        
        {/* Right Side - Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img alt="Voting box" className="w-2/3 md:w-full max-w-md" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
