import React, { useState, useCallback } from 'react';
import { getQuoteEstimate } from '../services/geminiService';
import type { QuoteEstimate } from '../types';

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-green"></div>
        <p className="text-brand-dark font-semibold">Our AI is landscaping your estimate...</p>
    </div>
);

const EstimateResult: React.FC<{ estimate: QuoteEstimate }> = ({ estimate }) => (
    <div className="bg-white p-8 rounded-lg shadow-inner animate-fade-in-up w-full">
        <h3 className="text-3xl font-bold font-serif text-brand-dark mb-2">{estimate.projectName}</h3>
        <p className="text-gray-600 italic mb-6">{estimate.overallImpression}</p>

        {estimate.suggestedServices && estimate.suggestedServices.length > 0 && (
            <>
                <div className="space-y-6 mb-6">
                    {estimate.suggestedServices.map((service, index) => (
                        <div key={index} className="border-l-4 border-brand-light-green pl-4 py-2">
                            <div className="flex justify-between items-baseline flex-wrap">
                                <h4 className="text-xl font-semibold text-brand-dark mr-2">{service.serviceName}</h4>
                                <span className="text-lg font-bold text-brand-green whitespace-nowrap">{service.estimatedCost}</span>
                            </div>
                            <p className="text-gray-700 mt-1 mb-2">{service.description}</p>
                            {service.costBreakdown && service.costBreakdown.length > 0 && (
                                <div className="mt-2 pt-2 pl-4 border-l-2 border-gray-200">
                                    {service.costBreakdown.map((item, i) => (
                                        <div key={i} className="flex justify-between items-baseline text-sm">
                                            <p className="text-gray-600">{item.item}</p>
                                            <p className="font-medium text-gray-800">{item.cost}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {estimate.totalEstimatedCost && (
                     <div className="border-t-2 border-dashed border-gray-300 pt-4 mt-6 text-right">
                        <p className="text-gray-600 text-lg">Total Estimated Cost:</p>
                        <p className="text-3xl font-bold text-brand-dark">{estimate.totalEstimatedCost}</p>
                    </div>
                )}
            </>
        )}
        
        {estimate.clarifyingQuestions && estimate.clarifyingQuestions.length > 0 && (
            <div className="mt-4 border-t border-dashed border-gray-200 pt-6">
                <h4 className="text-xl font-semibold text-brand-dark mb-3">To give you a better estimate, could you tell us more?</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 pl-2">
                    {estimate.clarifyingQuestions.map((question, index) => (
                        <li key={index}>{question}</li>
                    ))}
                </ul>
                <p className="text-sm text-gray-600 mt-6 text-center italic">Please add more detail to your description above and try again!</p>
            </div>
        )}

        <p className="text-xs text-gray-500 mt-8 text-center">{estimate.disclaimer}</p>
    </div>
);


const QuoteEstimator: React.FC = () => {
    const [projectDescription, setProjectDescription] = useState('');
    const [estimate, setEstimate] = useState<QuoteEstimate | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        if (!projectDescription.trim()) {
            setError('Please describe your project.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setEstimate(null);

        try {
            const result = await getQuoteEstimate(projectDescription);
            setEstimate(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [projectDescription]);

    return (
        <section id="quote-estimator" className="py-20 bg-brand-dark text-brand-beige">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold font-serif">AI-Powered Quote Estimator</h2>
                    <p className="text-lg text-brand-beige/80 mt-2">Describe your dream yard and get an instant preliminary estimate.</p>
                    <div className="mt-4 w-24 h-1 bg-brand-light-green mx-auto"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="mb-8">
                        <textarea
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            placeholder="e.g., 'I have a medium-sized backyard that gets a lot of sun. I want a new stone patio for grilling, some raised flower beds along the fence, and to fix the patchy grass.'"
                            className="w-full h-40 p-4 rounded-lg bg-brand-beige text-brand-dark placeholder-gray-500 focus:ring-2 focus:ring-brand-light-green focus:outline-none transition"
                            disabled={isLoading}
                            aria-label="Project Description"
                        />
                        <button
                            type="submit"
                            className="mt-4 w-full bg-brand-light-green hover:bg-brand-green text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Analyzing...' : 'Get My Estimate'}
                        </button>
                    </form>

                    <div className="mt-8 min-h-[12rem] flex items-center justify-center p-4 bg-gray-800/20 rounded-lg">
                        {isLoading && <LoadingSpinner />}
                        {error && <div role="alert" className="text-red-300 bg-red-900/50 p-4 rounded-lg text-center font-semibold">{error}</div>}
                        {estimate && <EstimateResult estimate={estimate} />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuoteEstimator;
