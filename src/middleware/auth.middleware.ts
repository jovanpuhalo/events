import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from "src/config/jwt.secret";
import { JwtDataDto } from "src/dtos/auth.dto.ts/jwt.data.dto";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { UserService } from "src/services/user/user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private readonly administratorService: AdministratorService,
        private readonly userService: UserService

    ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }
        const token = req.headers.authorization;


        const tokenParts = token.split(' ');

        if (tokenParts.length !== 2) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }
        const tokenString = tokenParts[1];


        let jwtData: JwtDataDto;
        try {
            jwtData = jwt.verify(tokenString, jwtSecret);

        } catch (e) {
            throw new HttpException('Bad tokennnnnnnnt found', HttpStatus.UNAUTHORIZED);

        }


        if (jwtData.ip !== req.ip.toString()) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtData.ua !== req.headers["user-agent"]) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtData.role === "administrator") {

            const administrator = await this.administratorService.getById(jwtData.id)
            if (!administrator) {
                throw new HttpException('Acount not found', HttpStatus.UNAUTHORIZED);
            }
        }
        if (jwtData.role === "user") {

            const user = await this.userService.getById(jwtData.id)
            if (!user) {
                throw new HttpException('Acount not found', HttpStatus.UNAUTHORIZED);
            }
        }

        // const curentTimestamp = new Date().getDate() / 1000
        // if (curentTimestamp >= jwtData.exp) {
        //     throw new HttpException('Token expired please login ', HttpStatus.UNAUTHORIZED);
        // }

        //ZNA DA JE TOKEN ISTEKAO I BZ OVE PROVJERE , NE ZNAM KAKO

        req.token = jwtData;

        next();
    }

}