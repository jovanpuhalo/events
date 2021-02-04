export class ApiResponse {
    status: string;
    errorCode: number;
    message: string;

    constructor(status: string, errorCode: number, message: string) {
        this.status = status,
            this.errorCode = errorCode,
            this.message = message
    }
}