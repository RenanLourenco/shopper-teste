import Joi from "joi"

export const uploadValidator = Joi.object({
    image: Joi.string().base64({ paddingRequired: true }).required(),
    customer_code: Joi.string().required(),
    measure_datetime: Joi.date().iso().required(),
    measure_type: Joi.string().valid('WATER', 'GAS').required()
})

export interface UploadDTO {
    image: string
    customer_code: string
    measure_datetime: string
    measure_type: string
}


export interface UploadResponseDTO {
    image_url: string
    measure_value: number
    measure_uuid: string
    error_code?: 'INVALID_DATA' | 'DOUBLE_REPORT' 
    error_description?: string
}

