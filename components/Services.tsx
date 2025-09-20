
import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-brand-dark">Our Services</h2>
          <p className="text-lg text-gray-600 mt-2">Everything you need for a perfect landscape.</p>
          <div className="mt-4 w-24 h-1 bg-brand-light-green mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={service.title} 
              className="bg-brand-beige p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4 text-brand-green">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold font-serif text-brand-dark mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
