
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative h-[60vh] md:h-[80vh] bg-cover bg-center text-white flex items-center"
      style={{ backgroundImage: "url('https://picsum.photos/id/1018/1920/1080')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Crafting Your Dream Outdoor Space
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          From stunning garden designs to flawless lawn care, we bring your vision to life with passion and precision.
        </p>
        <a 
          href="#quote-estimator" 
          className="bg-brand-light-green hover:bg-brand-green text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          Get Your AI-Powered Estimate
        </a>
      </div>
    </section>
  );
};

export default Hero;
