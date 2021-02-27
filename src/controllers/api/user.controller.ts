import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { jwtSecret } from "src/config/jwt.secret";
import { JwtDataDto } from "src/dtos/auth.dto.ts/jwt.data.dto";
import { TokenDto } from "src/dtos/TokenDto";
import { EditUserDto } from "src/dtos/user/edit.user.dto";
import { User } from "src/entities/user.entity";
import { UserEvent } from "src/entities/user_event.entity";
import { AllowToRoles } from "src/misc/alow.to.roles.desriptor";
import { ApiResponse } from "src/misc/apiResponse";
import { RoleCheckGuard } from "src/misc/role.check.guard";
import { UserService } from "src/services/user/user.service";
import { UserEventService } from "src/services/UserEvent/User.Event.service";
import * as jwt from 'jsonwebtoken'


@Crud({
    model: {
        type: User
    },
    params: {
        id: {
            field: 'userId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            events: {
                eager: true
            },
        },
        exclude: ['passwordHash']
    },
    routes: {
        only: [
            "getOneBase",
            "getManyBase",
            "updateOneBase",
            "deleteOneBase"

        ],
        getOneBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('administrator')
            ]
        },
        getManyBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('administrator')
            ]
        },
        updateOneBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('user')
            ]
        },
        deleteOneBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('administrator')
            ]
        },
    },


})


@Controller('api')
export class UserController {
    constructor(
        public service: UserService,
        public userEventService: UserEventService
    ) { }

    @Patch('user/:id')
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('user')
    editUser(@Body() data: EditUserDto, @Param('id') id: number): Promise<User | ApiResponse> {
        console.log("usao u metod kontrolera");

        return this.service.editUserById(id, data);
    }

    @Get('events/:id')
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('user')
    getAllEventsForUser(@Param('id') id): Promise<User | ApiResponse> {
        return this.service.getById(id);
    }


    @Post('user/userId')
    async getUserIdByToken(@Body() token: TokenDto) {


        let jwtData: JwtDataDto;
        try {
            jwtData = jwt.verify(token.token, jwtSecret);


        } catch (e) {
            throw new HttpException('Bad tokennnnnnnnt found', HttpStatus.UNAUTHORIZED);

        }

        if (jwtData.role === "user") {
            const user = await this.service.getById(jwtData.id)
            if (!user) {
                throw new HttpException('Acount not found', HttpStatus.UNAUTHORIZED);
            }
        }
        const user = await this.service.getById(jwtData.id)

        return user;
    }

}