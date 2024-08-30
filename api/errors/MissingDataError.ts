import { CustomError } from "./CustomError";

export class MissingDataError extends CustomError {
    constructor(message: string, code: number, errorCode: string){
        super(message, code, errorCode);
        Object.setPrototypeOf(this, MissingDataError);
    }
}