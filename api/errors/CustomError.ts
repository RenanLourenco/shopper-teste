export class CustomError extends Error {
    public statusCode: number
    public errorCode: string
    constructor(message: string, code: number, errorCode: string){
        super(message);
        this.errorCode = errorCode;
        this.statusCode = code;
    }
}