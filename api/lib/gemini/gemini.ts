import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleAIFileManager  } from "@google/generative-ai/files"
import { FileHelper } from "../fileHelper/fileHelper"
import fs from 'fs/promises';
import path from "path";

type Base64 = string;

export class GeminiAdapter {
    protected model: GenerativeModel;
    private ai: GoogleGenerativeAI;
    private fileManager: GoogleAIFileManager;
    private fileHelper: FileHelper;

    constructor(g: GoogleGenerativeAI, f: GoogleAIFileManager, fh: FileHelper){
        this.ai = g;
        this.model = this.ai.getGenerativeModel({
            model:"gemini-1.5-flash"
        })
        this.fileManager = f;
        this.fileHelper = fh;
    }

    async uploadFile(data: Base64, imageName: string): Promise<string> {
        
        // //save file in temp;
        const uploadedImage = await this.fileHelper.saveImageInTemp(data, imageName);

        //upload to gemini

        const uploadGemini = await this.fileManager.uploadFile(uploadedImage, {
            mimeType: "image/jpeg",
            displayName: imageName,
        })


        return uploadGemini.file.uri;
    }

    async generateContent(fileUri: string, text: string): Promise<string>{
        const res = await this.model.generateContent([
            {
              fileData: {
                fileUri: fileUri,
                mimeType: "image/jpeg"
              }
            },
            { text: text },
        ]);

        return res.response.text();
    }

}