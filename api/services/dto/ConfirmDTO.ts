import Joi from "joi";

export const confirmValidator = Joi.object({
    measure_uuid: Joi.string().required(),
    confirmed_value: Joi.number().required()
})


export interface ConfirmDTO {
    measure_uuid: string
    confirmed_value: number
}


export interface ConfirmResponseDTO {
    success: boolean
    error_code?: 'INVALID_DATA' | 'MEASURE_NOT_FOUND' | 'CONFIRMATION_DUPLICATE'
    error_description?: string
}