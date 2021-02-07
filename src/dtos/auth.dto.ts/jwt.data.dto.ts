export class JwtDataDto {

    role: "administrator" | "user";
    id: number;
    username: string;
    exp: number; //UNIX TIMESTAMP
    ip: string;
    ua: string;

    toPlainObject() {
        return {
            role: this.role,
            id: this.id,
            username: this.username,
            exp: this.exp,
            ua: this.ua,
            ip: this.ip,
        }
    }
}