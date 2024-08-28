import { UploadDTO, UploadResponseDTO } from "../dto/UploadDTO";

export interface IUploadService {
    uploadData(data: UploadDTO): Promise<UploadResponseDTO>;
}