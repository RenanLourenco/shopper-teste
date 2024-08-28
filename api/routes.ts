import { Router } from "express";
import { GeminiAdapter } from "./lib/gemini/gemini";
import 'dotenv/config'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/dist/server/server";
import { MeasureService } from "./services/MeasureService";
import { MeasureController } from "./controllers/MeasureController";

const geminiApiKey: string = process.env.API_KEY as string;


const routes = Router();


const genAI = new GoogleGenerativeAI(geminiApiKey);
const genAIFileManager = new GoogleAIFileManager(geminiApiKey);
const geminiAdapter = new GeminiAdapter(genAI,genAIFileManager);

const measureService = new MeasureService(geminiAdapter);
const measureController = new MeasureController(measureService);

routes.post("/upload", measureController.upload.bind(measureController))


export { routes }