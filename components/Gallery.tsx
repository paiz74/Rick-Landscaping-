import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';

// Get unique categories from the images and add 'All' to the beginning
const categories = ['All', ...Array.from(new Set(GALLERY_IMAGES.map(image => image.category)))];

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredImages = activeFilter === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(image => image.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-brand-beige">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-brand-dark">Our Work</h2>
          <p className="text-lg text-gray-600 mt-2">A glimpse into the beautiful spaces we've created.</p>
          <div className="mt-4 w-24 h-1 bg-brand-light-green mx-auto"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-light-green focus:ring-offset-2 focus:ring-offset-brand-beige ${
                activeFilter === category
                  ? 'bg-brand-green text-white shadow-lg transform scale-105'
                  : 'bg-white text-brand-dark hover:bg-brand-light-green hover:text-white hover:shadow-md'
              }`}
              aria-pressed={activeFilter === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className="group relative overflow-hidden rounded-lg shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-lg font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">{image.alt}</h3>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
