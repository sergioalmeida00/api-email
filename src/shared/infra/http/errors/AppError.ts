export class AppError{
    public readonly message:string;
    public readonly statusCode:number;

    constructor(message:string, satusCode = 400){
        this.message = message;
        this.statusCode = satusCode;
    }
}