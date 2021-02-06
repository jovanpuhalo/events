
export class LoginInfoAdministratorDto {
    administratorid: number;
    username: string;
    token: string;


    constructor(id: number, username: string, jwt: string) {
        this.administratorid = id;
        this.username = username;
        this.token = jwt;

    }
}