import { UploadDTO, UploadResponseDTO } from "./dto/UploadDTO";
import { IUploadService } from "./interfaces/IUploadService";
import { GeminiAdapter } from "../lib/gemini/gemini"

export class UploadService implements IUploadService {
    constructor(private gemini: GeminiAdapter){}

    uploadData(data: UploadDTO): Promise<UploadResponseDTO> {
        
        throw new Error("Method not implemented.");
    }

}