import { CustomError } from "./CustomError";

export class InvalidMeasureTypeError extends CustomError {
    constructor(message: string, code: number, errorCode: string){
        super(message, code, errorCode);
        Object.setPrototypeOf(this, InvalidMeasureTypeError);
    }
}