import { Measure } from "@prisma/client";
import { ConfirmDTO, ConfirmResponseDTO } from "../dto/ConfirmDTO";
import { UploadDTO, UploadResponseDTO } from "../dto/UploadDTO";

export interface IMeasureService {
    uploadData(data: UploadDTO): Promise<UploadResponseDTO>;
    confirmMeasure(data: ConfirmDTO): Promise<ConfirmResponseDTO>;
    listMeasuresByCustomerCode(customerCode: string, measureType?: string): Promise<Partial<Measure>[]>
}