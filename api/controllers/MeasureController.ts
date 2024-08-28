import { Request, Response } from "express";
import { uploadValidator } from "../services/dto/UploadDTO";
import {MissingDataError} from "../errors/MissingDataError";
import { IUploadService } from "../services/interfaces/IUploadService";

export class MeasureController {
    constructor(private uploadService: IUploadService){}

    async upload(req: Request, res: Response){
        const { image, customer_code, measure_datetime, measure_type} = req.body;

        const { error } = uploadValidator.validate({image, customer_code, measure_datetime, measure_type});

        if(error){
            throw new MissingDataError(error.message, 400)
        }

        const upload = await this.uploadService.uploadData({
            image,
            customer_code,
            measure_datetime,
            measure_type
        });

        if(upload.error_code){
            return res.status(400).json({
                error_code: upload.error_code,
                error_description: upload.error_description
            });
        }
        

        return res.status(200).json(upload);
    }
}