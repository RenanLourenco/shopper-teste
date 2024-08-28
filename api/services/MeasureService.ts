import { UploadDTO, UploadResponseDTO } from "./dto/UploadDTO";
import { IMeasureService } from "./interfaces/IMeasureService";
import { GeminiAdapter } from "../lib/gemini/gemini"

export class MeasureService implements IMeasureService {
    constructor(private gemini: GeminiAdapter) { }

    async uploadData(data: UploadDTO): Promise<UploadResponseDTO> {
        await this.gemini.uploadFile(data.image);
        throw new Error("Method not implemented.");
    }

}