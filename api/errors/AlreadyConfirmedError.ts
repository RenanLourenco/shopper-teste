import { CustomError } from "./CustomError";

export class AlreadyConfirmedError extends CustomError {
    constructor(message: string, code: number, errorCode: string){
        super(message, code, errorCode);
        Object.setPrototypeOf(this, AlreadyConfirmedError);
    }
}