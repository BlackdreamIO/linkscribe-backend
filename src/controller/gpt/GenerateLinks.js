import gemini from "../../lib/Gemini.js";

import { RegexJsonOutputValidator } from "../../helpers/RegexJsonValidator.js";

import {
    GEMINI_DEFAULT_HARM_CONFIG,
    GEMINI_SAFEST_HARM_CONFIG,
    GEMINI_MEDIUM_DANGER_HARM_CONFIG,
    GEMINI_DANGER_HARM_CONFIG 
} from "../../static/GenerationConfig.js";


function validateRequestBody({ prompt, maxGeneration, safetyLevel }) {
    let error = null;

    if(prompt == undefined || prompt == "") {
        error = "Required Feild : Prompt";
    }
    else if(maxGeneration == undefined || maxGeneration == 0) {
        error = "Required Feild : Max Links ";
    }
    else if(safetyLevel == undefined || safetyLevel == "") {
        error = "Required Feild : Safety Level";
    }

    return { valid : error == null, error };
}

export const GenerateLinks = async (req, res) => {
    try
    {
        const { prompt, maxGeneration, safetyLevel } = req.body;

        const { valid, error } = validateRequestBody({ prompt, maxGeneration, safetyLevel });

        if(!valid) {
            res.status(500).send({ error : null, code : 500, usages : null, message : error});
            return;
        }

        let safetySettings = [];

        switch (safetyLevel)
        {
            case "default":
                safetySettings = GEMINI_DEFAULT_HARM_CONFIG;
                break;

            case "safest":
                safetySettings = GEMINI_SAFEST_HARM_CONFIG;
                break;

            case "medium":
                safetySettings = GEMINI_MEDIUM_DANGER_HARM_CONFIG;
                break;

            case "danger":
                safetySettings = GEMINI_DANGER_HARM_CONFIG;
                break;
        
            default:
                safetySettings = GEMINI_DEFAULT_HARM_CONFIG;
                break;
        }
        
        const modifiedPrompt = `${prompt} You can generate a maximum of ${maxGeneration} links. You cannot exceed this limit.`;
        const tokenCounts = await gemini({ safetySettings }).countTokens(prompt);

        if(tokenCounts > 1000) {
            res.status(155).send({
                error : null,
                code : 155,
                usages : null,
                message : `Token Limit Exceeded : ${tokenCounts} >> reduce the input size `
            });
            return;
        }

        //await gemini.generationConfig(generationConfig);
        const result = await gemini({ safetySettings }).generateContent(modifiedPrompt);

        if(result.response ) {

            const outputResponse = result.response.text();

            const isValid = RegexJsonOutputValidator(outputResponse);

            if(isValid) {
                res.status(200).send({  
                    error : null,
                    code : 200,
                    message : "sucessfully generated links",
                    usages : result.response.usageMetadata,
                    data : JSON.parse(outputResponse)?.links?.map(x => x.link) ?? []
                });
            }

            else {
                res.status(200).send({  
                    error : null,
                    code : 200,
                    message : "structured error while generating in json format",
                    usages : null,
                    data : []
                });   
            }
        }
        else {
            res.status(404).send({ error : null, code : 404, usages : null, message : "Error generating links", data : []});    
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error : error, code : 500, usages : null, message : "Error generating links", data : []});
    }
}
