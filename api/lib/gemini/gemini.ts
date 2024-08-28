import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleAIFileManager  } from "@google/generative-ai/server"
import fs from 'fs/promises';
import path from "path";

type Base64 = string;

export class GeminiAdapter {
    protected model: GenerativeModel;
    private ai: GoogleGenerativeAI;
    private fileManager: GoogleAIFileManager

    constructor(g: GoogleGenerativeAI, f: GoogleAIFileManager){
        this.ai = g;
        this.model = this.ai.getGenerativeModel({
            model:"gemini-1.5-pro"
        })
        this.fileManager = f;
    }

    async uploadFile(data: Base64) {
        
        //save file in temp;
        const buffer = Buffer.from(data, 'base64');
        const filePath = path.join(__dirname, 'temp', "imagem temp")

        await fs.writeFile(filePath, buffer);

        
    }

}