import { GoogleGenAI, Type } from "@google/genai";
import type { QuoteEstimate } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
    type: Type.OBJECT,
    properties: {
        projectName: {
            type: Type.STRING,
            description: "A creative and fitting name for the user's landscaping project, like 'Serene Patio Retreat' or 'Modern Family Yard'."
        },
        overallImpression: {
            type: Type.STRING,
            description: "A brief, encouraging summary of the project based on the user's description. Should be 1-2 sentences. If asking clarifying questions, this should explain why more detail is needed."
        },
        suggestedServices: {
            type: Type.ARRAY,
            description: "An array of landscaping services identified from the user's request. Provide this ONLY if the user's description is detailed enough to create an estimate.",
            items: {
                type: Type.OBJECT,
                properties: {
                    serviceName: {
                        type: Type.STRING,
                        description: "The name of the specific landscaping service, e.g., 'Patio Installation', 'Lawn Renovation'."
                    },
                    description: {
                        type: Type.STRING,
                        description: "A short, 1-2 sentence description of the work this service entails for the user's project."
                    },
                    estimatedCost: {
                        type: Type.STRING,
                        description: "A rough, non-binding price range for this service (e.g., '$2,000 - $4,500'). Preface with a tilde (~)."
                    },
                    costBreakdown: {
                        type: Type.ARRAY,
                        description: "An optional breakdown of costs for this service, such as materials and labor.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                item: {
                                    type: Type.STRING,
                                    description: "The name of the cost item (e.g., 'Paver Materials', 'Labor')."
                                },
                                cost: {
                                    type: Type.STRING,
                                    description: "The estimated cost range for this item (e.g., '$800 - $1,200'). Preface with a tilde (~)."
                                }
                            },
                            required: ["item", "cost"]
                        }
                    }
                },
                required: ["serviceName", "description", "estimatedCost"]
            }
        },
        clarifyingQuestions: {
            type: Type.ARRAY,
            description: "An array of 3-5 questions to ask the user to get more details if their description is too vague to provide a meaningful estimate. Provide this ONLY if the description is vague.",
            items: {
                type: Type.STRING,
            }
        },
        totalEstimatedCost: {
            type: Type.STRING,
            description: "The total combined rough, non-binding price range for all suggested services. Preface with a tilde (~). Omit if asking clarifying questions."
        },
        disclaimer: {
            type: Type.STRING,
            description: "A friendly disclaimer stating that this is an AI-generated estimate and a formal quote requires an on-site consultation."
        }
    },
    required: ["projectName", "overallImpression", "disclaimer"]
};

export const getQuoteEstimate = async (projectDescription: string): Promise<QuoteEstimate> => {
    try {
        const prompt = `You are a friendly, expert landscaping consultant AI. Your goal is to provide a preliminary estimate based on a user's project description.

Analyze the following landscaping project description:
Project Description: "${projectDescription}"

**Your Task:**

1.  **Assess Clarity:** First, determine if the description is detailed enough to create a reasonable, itemized estimate.
    *   **Sufficient Detail:** Look for specifics like area dimensions (e.g., '10x12 patio'), material preferences (e.g., 'stone patio', 'oak trees'), and clear objectives (e.g., 'fix patchy grass', 'install lighting along the walkway').
    *   **Vague Description:** Identify descriptions that are too general (e.g., 'make my backyard look nice', 'do some landscaping'), lack dimensions, or are unclear about the scope of work.

2.  **Generate Response:** Based on your assessment, respond in ONE of the following two ways:

    *   **A) If the description is detailed enough:**
        *   Provide a full estimate.
        *   For each service, try to break down the cost into 'Materials' and 'Labor'. You can add other specific items if relevant. This breakdown should be in the \`costBreakdown\` field.
        *   Calculate the total estimated cost for the entire project.
        *   Use typical US pricing for landscaping work. All estimates must be ranges (e.g., "$1000 - $1500").
        *   Your tone should be encouraging and professional.

    *   **B) If the description is VAGUE:**
        *   Do NOT provide any cost estimates (\`suggestedServices\` or \`totalEstimatedCost\`).
        *   Instead, provide a list of 3-5 specific, clarifying questions in the \`clarifyingQuestions\` field that will help you generate an accurate estimate.
        *   The questions should guide the user to provide the necessary details (e.g., "What are the approximate dimensions of the patio you're envisioning?", "What kind of plants or flowers did you have in mind for the garden beds?").
        *   Maintain a helpful and friendly tone, explaining that more detail is needed for a good estimate in the \`overallImpression\` field.

**IMPORTANT:** Respond with EITHER \`suggestedServices\`/\`totalEstimatedCost\` OR \`clarifyingQuestions\` in your JSON output, never both sets of fields.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.5,
            },
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);

        return parsedResponse as QuoteEstimate;

    } catch (error) {
        console.error("Error generating quote estimate:", error);
        throw new Error("Failed to get an estimate from our AI assistant. Please check your description or try again later.");
    }
};
