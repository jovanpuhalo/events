import { Body, Controller, Post, Req } from "@nestjs/common";
import { LoginAdministratorDto } from "src/dtos/administrator/login.administrator.dto";
import { LoginInfoAdministratorDto } from "src/dtos/administrator/login.info.Administrator.dto";
import { ApiResponse } from "src/misc/apiResponse";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from 'jsonwebtoken'
import { JwtDataDto } from "src/dtos/administrator/jwt.data.dto";
import { Request } from "express";
import { jwtSecret } from "src/config/jwt.secret";

@Controller('auth')
export class AuthController {
    constructor(
        private administratorService: AdministratorService
    ) { }

    @Post('login')
    async doLogin(@Body() data: LoginAdministratorDto, @Req() req: Request): Promise<LoginInfoAdministratorDto | ApiResponse> {
        const administrator = await this.administratorService.getByUsername(data.username);

        if (!administrator) {
            return new ApiResponse("error", -3001, "There is no administrator with that username")

        }

        const crypto = require('crypto');
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if (administrator.passwordHash != passwordHashString) {
            return new ApiResponse('error', -3002, 'incorrect password')
        }

        const jwtData = new JwtDataDto();
        jwtData.administratorId = administrator.administratorId;
        jwtData.username = administrator.username;
        let sada = new Date();
        sada.setDate(sada.getDate());
        const istekTimestamp = sada.getTime() / 1000 + 60;
        jwtData.exp = istekTimestamp;
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];


        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        let objectResponse = new LoginInfoAdministratorDto(
            administrator.administratorId,
            administrator.username,
            token
        );

        return new Promise(resolve => resolve(objectResponse));
    }
}