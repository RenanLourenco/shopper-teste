import { UploadDTO, UploadResponseDTO } from "../dto/UploadDTO";

export interface IMeasureService {
    uploadData(data: UploadDTO): Promise<UploadResponseDTO>;
}