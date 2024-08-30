import { CustomError } from "./CustomError";

export class DoubleReportError extends CustomError {
    constructor(message: string, code: number, errorCode: string){
        super(message, code, errorCode);
        Object.setPrototypeOf(this, DoubleReportError);
    }
}