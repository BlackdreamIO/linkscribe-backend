import { GoogleGenerativeAI } from "@google/generative-ai";
import { INSTRUCTION_PROMPT } from "../static/Instruction.js";
import { generationConfig } from "../static/GenerationConfig.js";
import dotenv from "dotenv";

dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const gemini = ({ safetySettings=[] }) => genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction : INSTRUCTION_PROMPT,
    generationConfig : generationConfig,
    safetySettings : safetySettings ?? [],
});

export default gemini;