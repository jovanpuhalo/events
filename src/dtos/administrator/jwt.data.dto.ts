export class JwtDataDto {

    administratorId: number;
    username: string;
    exp: number; //UNIX TIMESTAMP
    ip: string;
    ua: string;

    toPlainObject() {
        return {
            id: this.administratorId,
            username: this.username,
            exp: this.exp,
            ua: this.ua,
            ip: this.ip,
        }
    }
}