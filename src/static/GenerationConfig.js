import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";


export const generationConfig = {
    temperature: 1.2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 4096,
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        links: {
          type: "array",
          items: {
            type: "object",
            properties: {
              link: {
                type: "object",
                properties: {
                  id: {
                    type: "string"
                  },
                  title: {
                    type: "string"
                  },
                  url: {
                    type: "string"
                  },
                  ref: {
                    type: "string"
                  },
                  visit_count: {
                    type: "string"
                  },
                  created_at: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    },
};

export const GEMINI_DEFAULT_HARM_CONFIG = [
    // {
    //   category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    //   threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    // },
    // {
    //   category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    //   threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    // },
    {
        category : HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold : HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    },
    // {
    //     category : HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    //     threshold : HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    // },
    // {
    //     category : HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY,
    //     threshold : HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    // }
];
export const GEMINI_SAFEST_HARM_CONFIG = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category : HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold : HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
    },
    {
        category : HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold : HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
    },
    {
        category : HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY,
        threshold : HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
    }
];
export const GEMINI_MEDIUM_DANGER_HARM_CONFIG = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
        category : HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold : HarmBlockThreshold.BLOCK_ONLY_HIGH
    },
    {
        category : HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold : HarmBlockThreshold.BLOCK_ONLY_HIGH
    },
    {
        category : HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY,
        threshold : HarmBlockThreshold.BLOCK_ONLY_HIGH
    }
];
export const GEMINI_DANGER_HARM_CONFIG = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category : HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold : HarmBlockThreshold.BLOCK_NONE
    },
    {
        category : HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold : HarmBlockThreshold.BLOCK_NONE
    },
    {
        category : HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY,
        threshold : HarmBlockThreshold.BLOCK_NONE
    }
];