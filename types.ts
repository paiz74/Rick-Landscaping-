import type React from 'react';

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

export interface CostBreakdownItem {
    item: string;
    cost: string;
}

export interface EstimatedService {
  serviceName: string;
  description: string;
  estimatedCost: string;
  costBreakdown?: CostBreakdownItem[];
}

export interface QuoteEstimate {
  projectName: string;
  overallImpression: string;
  suggestedServices?: EstimatedService[];
  clarifyingQuestions?: string[];
  totalEstimatedCost?: string;
  disclaimer: string;
}
