import { UploadDTO, UploadResponseDTO } from "./dto/UploadDTO";
import { IMeasureService } from "./interfaces/IMeasureService";
import { GeminiAdapter } from "../lib/gemini/gemini"
import { MeasureRepository } from "../repositories/MeasureRepository";
import { DoubleReportError } from "./../errors/DoubleReportError"
import { NotFoundError } from "./../errors/NotFoundError"
import {AlreadyConfirmedError} from "./../errors/AlreadyConfirmedError"
import { ConfirmDTO, ConfirmResponseDTO } from "./dto/ConfirmDTO";

export class MeasureService implements IMeasureService {
    constructor(private gemini: GeminiAdapter, private measureRepository: MeasureRepository) { }


    async uploadData(data: UploadDTO): Promise<UploadResponseDTO> {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const monthToFormatDate = (now.getMonth() + 1).toString().padStart(2, '0');
        const formattedDate = `${monthToFormatDate}_${year}`;

        const measures = await this.measureRepository.findMeasureBetweenDatesAndCustomerCode(
            firstDay.toISOString(),
            lastDay.toISOString(),
            data.customer_code
        );

        const fileName = `${data.customer_code}_${data.measure_type}_${formattedDate}`

        if(measures.length > 0) {
            if(measures.find(el => el.measure_type == data.measure_type)){
                throw new DoubleReportError("Leitura do mês já realizada", 400, "DOUBLE_REPORT")
            }
        }

        const fileUri = await this.gemini.uploadFile(data.image, fileName);
        
        let measureValue = await this.gemini.generateContent(fileUri, `return for me only the measure value of this bill, only the measure`)

        if(measureValue == "" && !measureValue){
            measureValue = await this.gemini.generateContent(fileUri, `return for me only the measure value of this bill, only the measure`)
        }


        const insert = await this.measureRepository.insert({
            customer_code: data.customer_code,
            has_confirmed: false,
            measure_datetime: now,
            image_url: `/public/${fileName}.jpg`,
            measure_type: data.measure_type,
            measure_value: parseFloat(measureValue)
        })
        

        return {
            image_url: insert.image_url,
            measure_value: parseFloat(measureValue),
            measure_uuid: insert.measure_uuid
        }

    }

    async confirmMeasure(data: ConfirmDTO): Promise<ConfirmResponseDTO> {
        const measure = await this.measureRepository.findByMeasureUUID(data.measure_uuid)

        if(!measure){
            throw new NotFoundError("Leitura não encontrada",404, "MEASURE_NOT_FOUND");
        }

        if(measure.has_confirmed){
            throw new AlreadyConfirmedError("Leitura já confirmada", 409, "CONFIRMATION_DUPLICATE");
        }

        await this.measureRepository.update({
            has_confirmed: true,
            measure_value: data.confirmed_value
        },data.measure_uuid);

        return {
            success: true
        };
    }

    async listMeasuresByCustomerCode(customerCode: string, measureType?: string){
        const measures = await this.measureRepository.findMeasureByCustomerCode(customerCode, measureType);
        

        return measures
    }
}