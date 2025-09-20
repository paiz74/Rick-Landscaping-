
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import QuoteEstimator from './components/QuoteEstimator';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-brand-beige min-h-screen font-sans text-brand-dark">
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Testimonials />
        <QuoteEstimator />
      </main>
      <Footer />
    </div>
  );
};

export default App;
