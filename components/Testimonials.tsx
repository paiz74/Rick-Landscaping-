
import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-brand-dark">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 mt-2">We're proud of the relationships we build.</p>
          <div className="mt-4 w-24 h-1 bg-brand-light-green mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-brand-beige p-8 rounded-lg shadow-lg flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-grow">
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
              </div>
              <div>
                <p className="font-bold text-brand-dark">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
