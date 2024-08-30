import { Request, Response } from "express";
import { uploadValidator } from "../services/dto/UploadDTO";
import { MissingDataError } from "../errors/MissingDataError";
import { InvalidMeasureTypeError } from "../errors/InvalidMeasureTypeError";
import { IMeasureService } from "../services/interfaces/IMeasureService";
import { confirmValidator } from "../services/dto/ConfirmDTO";
import { NotFoundError } from "../errors/NotFoundError";

export class MeasureController {
    constructor(private measureService: IMeasureService) { }

    async upload(req: Request, res: Response) {
        const { image, customer_code, measure_datetime, measure_type } = req.body;

        const { error } = uploadValidator.validate({ image, customer_code, measure_datetime, measure_type });

        if (error) {
            throw new MissingDataError(error.message, 400, "INVALID_DATA")
        }

        const upload = await this.measureService.uploadData({
            image,
            customer_code,
            measure_datetime,
            measure_type
        });

        if (upload.error_code) {
            return res.status(400).json({
                error_code: upload.error_code,
                error_description: upload.error_description
            });
        }


        return res.status(200).json(upload);
    }

    async confirm(req: Request, res: Response) {
        const { measure_uuid, confirmed_value } = req.body;

        const { error } = confirmValidator.validate({
            measure_uuid, confirmed_value
        });

        if (error) {
            throw new MissingDataError(error.message, 400, "INVALID_DATA")
        }

        const confirm = await this.measureService.confirmMeasure({
            confirmed_value,
            measure_uuid,
        })

        return res.status(200).json(confirm)
    }

    async listMeasuresByCustomerCode(req: Request, res: Response){
        const {customer_code} = req.params
        if(customer_code == "") {
            throw new MissingDataError("missing customer_code in params", 400, "INVALID_DATA")
        }

        const measure_type = req.query.measure_type as string

        let measureType: string | undefined;

        if(measure_type) {
            measureType = measure_type.toUpperCase()
            if(measureType.toLowerCase() != "water" && measureType.toLowerCase() != "gas"){
                throw new InvalidMeasureTypeError("Tipo de medição não permitida", 400, "INVALID_TYPE")
            }
            
        }
        const measures = await this.measureService.listMeasuresByCustomerCode(customer_code, measureType)

        if(measures.length == 0) {
            throw new NotFoundError("Nenhuma leitura encontrada", 404, "MEASURES_NOT_FOUND")
        }

        return res.status(200).json({
            customer_code: customer_code,
            measures
        })
    }

}