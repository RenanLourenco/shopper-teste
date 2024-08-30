import { Router } from "express";
import { GeminiAdapter } from "./lib/gemini/gemini";
import 'dotenv/config'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/files";
import { MeasureService } from "./services/MeasureService";
import { MeasureController } from "./controllers/MeasureController";
import { FileHelper } from "./lib/fileHelper/fileHelper";
import { PrismaClient } from "@prisma/client";
import { MeasureRepository } from "./repositories/MeasureRepository";

const geminiApiKey: string = process.env.GEMINI_API_KEY as string;

const routes = Router();


const prismaClient = new PrismaClient();

const genAI = new GoogleGenerativeAI(geminiApiKey);
const genAIFileManager = new GoogleAIFileManager(geminiApiKey);
const fileHelper = new FileHelper();
const geminiAdapter = new GeminiAdapter(genAI,genAIFileManager, fileHelper);


const measureRepository = new MeasureRepository(prismaClient)
const measureService = new MeasureService(geminiAdapter, measureRepository);
const measureController = new MeasureController(measureService);

routes.post("/upload", measureController.upload.bind(measureController))
routes.patch("/confirm", measureController.confirm.bind(measureController))
routes.get("/:customer_code/list", measureController.listMeasuresByCustomerCode.bind(measureController))

export { routes }