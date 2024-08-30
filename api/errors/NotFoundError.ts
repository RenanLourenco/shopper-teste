import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
    constructor(message: string, code: number, errorCode: string){
        super(message, code, errorCode);
        Object.setPrototypeOf(this, NotFoundError);
    }
}