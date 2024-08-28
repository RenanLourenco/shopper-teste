import { CustomError } from "./CustomError";

export class MissingDataError extends CustomError {
    constructor(message: string, code: number){
        super(message, code);
        Object.setPrototypeOf(this, MissingDataError);
    }
}