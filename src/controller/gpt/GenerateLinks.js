import gemini from "../../lib/Gemini.js";

import { RegexJsonOutputValidator } from "../../helpers/RegexJsonValidator.js";
import { INSTRUCTION_PROMPT } from "../../static/Instruction.js";


const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 1024,
    responseMimeType: "application/json",
};

export const GenerateLinks = async (req, res) => {
    try
    {
        const { prompt, maxLinks } = req.body;

        if(prompt == undefined || prompt == "") {
            res.status(500).send({ error : null, code : 500, usages : null, message : "Required Feild : Prompt"});  
            return;
        }
        if(maxLinks == undefined || maxLinks == 0) {
            res.status(500).send({ error : null, code : 500, usages : null, message : "Required Feild : Max Links "});  
            return;
        }

        const modifiedPrompt = prompt + INSTRUCTION_PROMPT + `max amount of link you will be generating is ${maxLinks}`;

        const tokenCounts = await gemini.countTokens(prompt);

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
        const result = await gemini.generateContent(modifiedPrompt);
        //await gemini.st
        
        if(result.response) {

            const outputResponse = result.response.text();

            const isValid = RegexJsonOutputValidator(outputResponse);

            if(isValid) {
                res.status(200).send({  
                    error : null,
                    code : 200,
                    message : "sucessfully generated links",
                    usages : result.response.usageMetadata,
                    data : result.response.text()
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
        res.status(500).send({ error : error, code : 500, usages : null, message : "Error generating links", data : []});
    }
}