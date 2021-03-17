import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from "@nestjs/common";
import { LoginAdministratorDto } from "src/dtos/administrator/login.administrator.dto";
import { LoginInfoDto } from "src/dtos/auth.dto.ts/login.info.dto";
import { ApiResponse } from "src/misc/apiResponse";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from 'jsonwebtoken'
import { JwtDataDto } from "src/dtos/auth.dto.ts/jwt.data.dto";
import { Request } from "express";
import { jwtSecret } from "src/config/jwt.secret";
import { LoginUserDto } from "src/dtos/user/user.login.dto";
import { UserService } from "src/services/user/user.service";
import { User } from "src/entities/user.entity";
import { AddUserDto } from "src/dtos/user/add.user.dto";

@Controller('auth')
export class AuthController {
    constructor(
        public administratorService: AdministratorService,
        public userService: UserService

    ) { }

    @Post('administrator/login')
    async administratorLogin(@Body() data: LoginAdministratorDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse> {
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
        jwtData.role = "administrator";
        jwtData.id = administrator.administratorId;
        jwtData.username = administrator.username;
        let sada = new Date();
        sada.setDate(sada.getDate() + 2);
        const istekTimestamp = sada.getTime() / 1000;
        jwtData.exp = istekTimestamp;
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];


        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        let objectResponse = new LoginInfoDto(
            administrator.administratorId,
            administrator.username,
            token
        );

        return new Promise(resolve => resolve(objectResponse));
    }

    @Post('user/login')
    async userLogin(@Body() data: LoginUserDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse> {


        const user: User = await this.userService.getByUsername(data.username);

        if (!user) {
            return new Promise(resolve => resolve(new ApiResponse('error', -4001, "Can't find user with that username")))
        }
        if (user.validation === '1') {

            return new Promise(resolve => resolve(new ApiResponse('error', -4003, "User is not valid")))
        }

        const crypto = require('crypto');
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if (user.passwordHash != passwordHashString) {
            return new ApiResponse('error', -4002, 'Incorrect password')
        }

        let jwtData = new JwtDataDto();
        jwtData.role = "user";
        jwtData.id = user.userId;
        jwtData.username = user.username;
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];

        let sada = new Date();
        sada.setDate(sada.getDate() + 10);
        let istekTimestamp = sada.getTime() / 1000 + 20;
        jwtData.exp = istekTimestamp;

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        let objectResponse = new LoginInfoDto(
            user.userId,
            user.username,
            token
        );

        return new Promise(resolve => resolve(objectResponse))
    }

    @Post('user/registration')
    createUser(@Body() data: AddUserDto): Promise<User | ApiResponse> {
        return this.userService.createUser(data);
    }


    // @Post('user/userId')
    // async getUserIdByToken(@Body() token: TokenDto) {


    //     let jwtData: JwtDataDto;
    //     try {
    //         jwtData = jwt.verify(token.token, jwtSecret);


    //     } catch (e) {
    //         throw new HttpException('Bad tokennnnnnnnt found', HttpStatus.UNAUTHORIZED);

    //     }

    //     if (jwtData.role === "user") {
    //         const user = await this.userService.getById(jwtData.id)
    //         if (!user) {
    //             throw new HttpException('Acount not found', HttpStatus.UNAUTHORIZED);
    //         }
    //     }


    //     return jwtData.id;
    // }
}