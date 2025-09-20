import React from 'react';
import type { Service, GalleryImage, Testimonial } from './types';
import LawnIcon from './components/icons/LawnIcon';
import GardenIcon from './components/icons/GardenIcon';
import HardscapeIcon from './components/icons/HardscapeIcon';
import LightIcon from './components/icons/LightIcon';

export const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Get a Quote', href: '#quote-estimator' },
];

export const SERVICES: Service[] = [
  {
    icon: <GardenIcon />,
    title: 'Garden Design & Planting',
    description: 'We create beautiful, sustainable gardens tailored to your style, from vibrant flower beds to tranquil green spaces.',
  },
  {
    icon: <HardscapeIcon />,
    title: 'Hardscaping & Patios',
    description: 'Our expert team builds stunning patios, walkways, retaining walls, and fire pits to enhance your outdoor living area.',
  },
  {
    icon: <LawnIcon />,
    title: 'Lawn Care & Maintenance',
    description: 'Achieve a lush, healthy lawn with our comprehensive services including mowing, fertilization, and weed control.',
  },
  {
    icon: <LightIcon />,
    title: 'Outdoor Lighting',
    description: 'Illuminate your landscape\'s best features with our custom outdoor lighting designs, adding beauty and security.',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
    { id: 1, src: 'https://picsum.photos/id/1015/600/400', alt: 'Lush garden path', category: 'Gardens' },
    { id: 2, src: 'https://picsum.photos/id/1043/600/400', alt: 'Stone patio with seating', category: 'Hardscaping' },
    { id: 3, src: 'https://picsum.photos/id/106/600/400', alt: 'Manicured lawn', category: 'Lawns' },
    { id: 11, src: 'https://picsum.photos/id/1074/600/400', alt: 'Tranquil koi pond with waterfall', category: 'Water Features' },
    { id: 5, src: 'https://picsum.photos/id/202/600/400', alt: 'Modern backyard design', category: 'Gardens' },
    { id: 12, src: 'https://picsum.photos/id/1016/600/400', alt: 'Vibrant seasonal flower display', category: 'Seasonal Color' },
    { id: 7, src: 'https://picsum.photos/id/28/600/400', alt: 'Outdoor lighting at dusk', category: 'Lighting' },
    { id: 10, src: 'https://picsum.photos/id/431/600/400', alt: 'Modern office complex entrance', category: 'Commercial' },
    { id: 9, src: 'https://picsum.photos/id/367/600/400', alt: 'Cozy fire pit area', category: 'Hardscaping' },
    { id: 8, src: 'https://picsum.photos/id/342/600/400', alt: 'Flower bed with colorful blooms', category: 'Gardens' },
    { id: 15, src: 'https://picsum.photos/id/305/600/400', alt: 'Rich autumn color planting', category: 'Seasonal Color' },
    { id: 6, src: 'https://picsum.photos/id/211/600/400', alt: 'Stone walkway', category: 'Hardscaping' },
    { id: 13, src: 'https://picsum.photos/id/160/600/400', alt: 'Rooftop garden oasis', category: 'Commercial' },
    { id: 14, src: 'https://picsum.photos/id/21/600/400', alt: 'Sleek modern water fountain', category: 'Water Features' },
    { id: 4, src: 'https://picsum.photos/id/157/600/400', alt: 'Backyard stream feature', category: 'Water Features' },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        quote: "Rick landscaping & mansonry completely transformed our backyard into a paradise. The team was professional, creative, and the AI quote was surprisingly accurate!",
        author: "Sarah & Tom Jenkins",
        location: "Greenwood"
    },
    {
        quote: "The attention to detail on our new stone patio is incredible. We spend all our time outside now. Highly recommend their hardscaping services.",
        author: "Michael Carter",
        location: "Oakville"
    },
    {
        quote: "Our lawn has never looked better. Their maintenance plan is worth every penny. It's a joy to come home to such a beautiful yard.",
        author: "Emily Rodriguez",
        location: "Pine Ridge"
    }
];